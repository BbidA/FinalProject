<template>
  <v-row align="center" justify="center">
    <v-col>
      <div id="function-chart" class="text-center">
        <svg />
      </div>
      <div style="justify-content: center; display: flex">
        <v-btn class="mt-6" large color="primary" @click="clearPath">
          Clear
        </v-btn>
        <v-btn
          class="mt-6 ml-6"
          large
          color="success"
          :disabled="!startable"
          @click="startGradientDescent"
        >
          Start
        </v-btn>
      </div>
      <div>
        <code-mirror v-model="python" mode="python" />
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import * as d3 from 'd3'
import Vue from 'vue'
import CodeMirror from './CodeMirror'
import { quadraticFunc1 as targetFunc } from '~/utils/functions'

const targetFunction = targetFunc.func
const targetFuncDomain = targetFunc.domain
const targetFuncRange = targetFunc.range
const BACK_END_URL = 'http://localhost:5000/gd'

type Selection = d3.Selection<SVGGElement, unknown, HTMLElement, any>
type LinearScale = d3.ScaleLinear<number, number>
type ContainerElement = d3.ContainerElement

const graidentDescentPy = `def gradient_descent(start_x, start_y, target_func, step_size=0.001, stop_condition=0.0001):
    curr_x, curr_y = start_x, start_y
    last_step = float('inf')
    points = []
    while last_step > stop_condition:
        # Calculate current step and do a descent
        delta = -target_func.df_func(curr_x) * step_size
        curr_x += delta
        curr_y = target_func.func(curr_x)
        points.append([curr_x, curr_y])

        last_step = abs(delta)

    return points`

export default Vue.extend({
  components: {
    CodeMirror
  },

  props: {
    height: {
      type: Number,
      default: 600
    },
    width: {
      type: Number,
      default: 1000
    },
    margin: {
      type: Number,
      default: 60
    },
    xTicks: {
      type: Number,
      default: 10
    },
    yTicks: {
      type: Number,
      default: 10
    }
  },

  data() {
    return {
      gdInProgress: false,
      startable: false,
      python: graidentDescentPy
    }
  },

  mounted() {
    this.startGradientDescent = this.renderChart()
  },

  methods: {
    // Should be initliaized by renderChart methods
    async startGradientDescent() {},

    createAxes(chart: Selection, chartHeight: number, chartWidth: number) {
      const yScale = makeYScale(chartHeight)
      // y axis on the right side without ticks
      chart
        .append('g')
        .call(
          d3
            .axisRight(yScale)
            .ticks(this.yTicks)
            .tickSize(chartWidth)
            .tickFormat(() => '')
        )
        .call(g => g.select('.domain').remove())
        .call(g => g.selectAll('.tick line').attr('stroke', '#ccc'))
      // y axis on the left side with ticks
      chart.append('g').call(d3.axisLeft(makeYScale(chartHeight)).ticks(this.yTicks))

      // x axis at the bottom with ticks
      const xScale = makeXScale(chartWidth)
      chart
        .append('g') // first
        .attr('transform', `translate(0, ${chartHeight})`)
        .call(d3.axisBottom(xScale).ticks(this.xTicks))
      // x axis at the top without ticks
      chart
        .append('g')
        .call(
          d3
            .axisTop(makeXScale(chartWidth))
            .ticks(this.xTicks)
            .tickSize(-chartHeight) // Negative number will make ticks point to the bottom
            .tickFormat(_ => '')
        )
        .call(g => g.select('.domain').remove())
        .call(g => g.selectAll('.tick:not(:first-of-type) line').style('stroke', '#ccc'))
      return [xScale, yScale]
    },

    clearPath(): void {
      // clear path
      d3.select('#gd-path').remove()
      d3.select('#gd-circle').attr('visibility', 'hidden')
      this.gdInProgress = false
      this.startable = false
    },

    async gradientDescent(x: number, y: number, targetFunc: string) {
      const code = this.python.trim()
      // Create form data
      const data = new FormData()
      data.append('code', code)
      data.append('x', x.toString())
      data.append('y', y.toString())
      data.append('targetFunc', targetFunc)

      // Pass code and start point to backend
      return (await this.$axios.$post(BACK_END_URL, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })) as { result: [[number, number]] }
    },

    renderChart() {
      const chart = d3
        .select('svg')
        .attr('width', this.width)
        .attr('height', this.height)
        .append('g')
        .classed('chart', true)
        .attr('transform', `translate(${this.margin}, ${this.margin})`)

      // calculate size of the chart
      const chartHeight = this.height - this.margin * 2
      const chartWidth = this.width - this.margin * 2

      // create axes
      const [xScale, yScale] = this.createAxes(chart, chartHeight, chartWidth)

      // render function line
      renderFunctionLine(chart, xScale, yScale)

      // Make legends
      const legends = d3
        .select('#function-chart')
        .append('div')
        .classed('legend', true)

      // Make guides
      const guides = chart.append('g').classed('guides', true)
      const [, yGuide] = createGuides(guides, chartHeight)

      // put a rectangle at the top of the chart for listening to the mouse event
      // so that the guides can react to mouse movement
      chart
        .append('rect')
        .attr('width', chartWidth)
        .attr('height', chartHeight)
        .style('opacity', 0)
        .on('mousemove', (_, i, n) => updateLegends(n[i]))
        .on('mouseout', clearGudies)
        .on('click', (_, i, n) => showStartCircle(n[i]))

      function updateLegends(container: ContainerElement) {
        const legendFormat = d3.format('.5f')
        const [realX, realY] = getMouseCoordinates(container)

        legends.text(`x: ${legendFormat(realX)} | y: ${legendFormat(realY)}`)

        // Move the guide lines
        guides.attr('transform', `translate(${xScale(realX)}, 0)`).attr('visibility', 'visible')
        yGuide.attr('transform', `translate(0, ${yScale(realY)})`)
      }

      function getMouseCoordinates(container: ContainerElement) {
        const mouseX = d3.mouse(container)[0]
        const realX = xScale.invert(mouseX)
        const realY = targetFunction(realX)
        return [realX, realY]
      }

      function clearGudies() {
        legends.text('Mouse not enter the chart')
        guides.attr('visibility', 'hidden')
      }

      // Add start circle
      const startCircle = chart
        .append('g')
        .classed('gradient', true)
        .append('circle')
        .attr('id', 'gd-circle')
        .attr('r', 7)
        .attr('visibility', 'hidden')

      const that = this
      let realX: number
      let realY: number

      // Show start circle when clicked
      function showStartCircle(container: ContainerElement) {
        if (that.startable) {
          return
        }

        ;[realX, realY] = getMouseCoordinates(container)
        startCircle
          .attr('transform', `translate(${xScale(realX)}, ${yScale(realY)})`)
          .attr('visibility', 'visible')

        that.startable = true
      }

      // Start gradient descent when click start
      return async function startGradientDescent() {
        if (that.gdInProgress) {
          return
        }
        that.gdInProgress = true
        that.startable = false

        // get the path data of gradient descent
        const circlePath = (await that.gradientDescent(realX, realY, 'quadraticFunc1')).result

        // draw the track of the circle movement
        const lineSeg = d3
          .line()
          .curve(d3.curveBasis)
          .x(d => xScale(d[0]))
          .y(d => yScale(d[1]))

        const pathSeg = chart
          .append('path')
          .datum(circlePath)
          .attr('id', 'gd-path')
          .attr('d', lineSeg)

        startCircle
          .transition()
          .duration(1500)
          .attrTween('transform', translateAlongPath(pathSeg.node()!))
      }
    }
  }
})

function makeYScale(chartHeight: number) {
  return makeLinearScale([chartHeight, 0], targetFuncRange)
}

function makeXScale(chartWidth: number) {
  return makeLinearScale([0, chartWidth], targetFuncDomain)
}

function makeLinearScale(range: [number, number], domain: [number, number]) {
  return d3
    .scaleLinear()
    .range(range)
    .domain(domain)
    .nice()
}

function translateAlongPath(path: SVGPathElement) {
  const pathLength = path.getTotalLength()
  return () => {
    return (t: number) => {
      const p = path.getPointAtLength(pathLength * t)
      return `translate(${p.x}, ${p.y})`
    }
  }
}

function renderFunctionLine(chart: Selection, xScale: LinearScale, yScale: LinearScale) {
  // Draw chart lines
  const points: [number, number][] = xScale
    .ticks(100)
    .map(x => [xScale(x), yScale(targetFunction(x))])
  const pathData = d3.line().curve(d3.curveBasis)(points)

  chart
    .append('g')
    .classed('series', true)
    .append('path')
    .attr('d', _ => pathData)
}

function createGuides(guides: Selection, chartHeight: number) {
  // creat y guide
  const yGuide = guides.append('g')
  yGuide
    .append('line')
    .attr('x1', -20)
    .attr('x2', 20)
    .style('stroke', '#BBF')
    .style('shape-rendering', 'crispEdges')

  // add circle to y guide
  yGuide
    .append('circle')
    .attr('r', 7)
    .style('fill', '#BBF')
    .style('stroke', '#348')
    .style('opacity', 0.2)

  // create x guide
  const xGuide = guides.append('g')
  xGuide
    .append('line')
    .attr('y1', chartHeight)
    .style('stroke', '#BBF')
    .style('shape-rendering', 'crispEdges')

  return [xGuide, yGuide]
}
</script>

<style>
.series path {
  fill: none;
  stroke: #348;
  stroke-width: 3px;
}

#gd-path {
  stroke: crimson;
  fill: none;
  stroke-dasharray: 0.2%;
  stroke-width: 2px;
}
</style>
