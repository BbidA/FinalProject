<template>
  <div class="charbadge">
    <div class="charbadge-image">
      <a href="/FEater" title="FEater">
        <img
          alt="Feater-0-portrait.png"
          src="http://en.rhinelab.org/images/thumb/1/1b/Feater-0-portrait.png/100px-Feater-0-portrait.png"
          width="100"
          height="183"
          srcset="
            http://en.rhinelab.org/images/thumb/1/1b/Feater-0-portrait.png/150px-Feater-0-portrait.png 1.5x,
            http://en.rhinelab.org/images/1/1b/Feater-0-portrait.png                                   2x
          "
        ></a>
    </div>
    <div class="charbadge-stars">
      <span v-for="i of Array(5).keys()" :key="i">★</span>
    </div>
    <div class="charbadge-class">
      <a
        href="/FEater"
        title="FEater"
      ><img
        alt="Class-specialist.png"
        src="http://en.rhinelab.org/images/thumb/c/cb/Class-specialist.png/30px-Class-specialist.png"
        width="30"
        height="30"
        srcset="
            http://en.rhinelab.org/images/thumb/c/cb/Class-specialist.png/45px-Class-specialist.png 1.5x,
            http://en.rhinelab.org/images/thumb/c/cb/Class-specialist.png/60px-Class-specialist.png 2x
          "
      ></a>
    </div>
    <div class="charbadge-color rarity-5" />
    <div class="charbadge-diagonal" />
    <div class="charbadge-name">
      <a href="/FEater" title="FEater">FEater</a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'OperatorCard',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    imgSrc(): string {
      return ''
    }
  }
})
</script>

<style scoped>
a {
  color: #8da5bf;
  text-decoration: none;
}

img {
  margin: 0;
  padding: 0;
  vertical-align: top;
}

.charbadge-stars {
  width: 100px;
  height: 40px;
  line-height: 20px;
  font-size: 18px;
  text-align: center;
  color: #f2ff35;
  position: relative;
  z-index: 2;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.9) 5px, rgba(0, 0, 0, 0) 40px);
  margin: 0px 0px 100px 0px;
  text-shadow: 0px 0px 2px #000, 0px 0px 2px #000, 0px 0px 5px #000;
}

.charbadge-color {
  width: 200px;
  height: 100px;
  position: absolute;
  bottom: 0px;
  left: -50px;
  z-index: 2;
  transform: rotate(20deg);
}

.charbadge-class {
  width: 34px;
  height: 34px;
  background: #202020;
  padding: 2px;
  position: absolute;
  z-index: 4;
  bottom: 35px;
  left: 5px;
}

.charbadge {
  width: 100px;
  height: 200px;
  position: relative;
  overflow: hidden;
  background: #909090;
  float: left;
  margin: 3px;
}

.charbadge-color.rarity-5 {
  background: linear-gradient(to top, rgba(255, 246, 216, 1) 50px, rgba(255, 246, 216, 0) 80px);
}

.charbadge-diagonal {
  width: 0;
  height: 0;
  border-bottom: 40px solid #303030;
  border-right: 100px solid transparent;
  position: absolute;
  z-index: 3;
  bottom: 30px;
}

.charbadge-name {
  width: 100px;
  height: 30px;
  line-height: 26px;
  font-size: 16px;
  text-align: center;
  color: #fff;
  position: absolute;
  bottom: 0px;
  z-index: 3;
  background: #303030;
}

.charbadge-image {
  width: 100px;
  position: absolute;
  z-index: 1;
  bottom: 0px;
}
</style>
