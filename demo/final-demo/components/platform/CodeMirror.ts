import Vue, { PropOptions, VNode } from 'vue'
import { EditorFromTextArea, EditorConfiguration } from 'codemirror'

interface Mode {
  name: string
}

export default Vue.extend({
  name: 'CodeMirror',
  props: {
    value: {
      type: String,
      default: ''
    },
    mode: {
      type: [String, Object],
      default: ''
    } as PropOptions<string | Mode>,
    theme: {
      type: String,
      default: 'default'
    },
    indentWithTabs: {
      type: Boolean,
      default: false
    },
    tabSize: {
      type: Number,
      default: 2
    },
    lineWrapping: {
      type: Boolean,
      default: true
    },
    lineNumbers: {
      type: Boolean,
      default: true
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // Code mirror editor
      CM: null as EditorFromTextArea | null
    }
  },
  computed: {
    componentData() {
      return {
        staticClass: 'notranslate m-0 p-0',
        style: { minHeight: '300px' },
        attrs: { translate: 'no' }
      }
    }
  },
  watch: {
    value(newVal, oldVal) {
      if (!oldVal || oldVal === '') {
        this.CM!.setValue(newVal)
      }
    }
  },
  mounted() {
    import('~/utils/code-mirror').then(module => {
      const CodeMirror = module.default

      if (CodeMirror) {
        this.CM = CodeMirror.fromTextArea(this.$refs.input as HTMLTextAreaElement, {
          mode: this.mode,
          theme: this.theme,
          indentWithTabs: this.indentWithTabs,
          tabSize: this.tabSize,
          lineWrapping: this.lineWrapping,
          lineNumbers: this.lineNumbers,
          autoCloseTags: true,
          autoCloseBrackets: true,
          readOnly: this.readOnly
        } as EditorConfiguration)

        this.CM.on('changes', () => {
          this.$emit('input', this.CM!.getValue())
        })

        this.$nextTick(() => {
          this.CM!.setValue(this.value)
        })
      }
    })
  },
  beforeDestroy() {
    if (this.CM) {
      this.CM.toTextArea()
    }
    this.CM = null
  },

  render(h): VNode {
    // Create toolbar
    const $toolBar = h('v-toolbar', { attrs: { color: 'grey lighten-3', dense: true, flat: true } })

    // Creat text area for code mirror
    const $textArea = h('div', this.componentData, [
      h('textarea', {
        ref: 'input',
        staticClass: 'w-100 border-0',
        style: { minWidth: '100px' },
        props: { value: this.value }
      })
    ])

    // Wrap toolbar and text area with v-card
    return h('v-card', { attrs: { outlined: false, maxWidth: '1000px' }, class: ['my-12', 'mx-auto'] }, [$toolBar, $textArea])
  }
})
