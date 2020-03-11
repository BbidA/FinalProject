<template>
  <nuxt-link
    to="/"
    class="d-flex align-sm-center"
    title="Home Page"
    aria-label="Home Page"
    @click.native="$vuetify.goTo(0)"
  >
    <v-img
      alt="Vuetify Logo"
      class="shrink mr-2"
      contain
      src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
      transition="scale-transition"
      width="40"
    />

    <v-img
      alt="Vuetify Name"
      class="shrink mt-1 hidden-sm-and-down"
      contain
      min-width="100"
      src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
      width="100"
    />
  </nuxt-link>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'BaseVuetifyLogo'
})
</script>

<style>
.VuetifyLogo {
  width: 180px;
  transform: rotateY(560deg);
  animation: turn 3.5s ease-out forwards 1s;
}

@keyframes turn {
  100% {
    transform: rotateY(0deg);
  }
}
</style>
