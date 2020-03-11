<template>
  <v-app-bar
    id="app-toolbar"
    app
    color="primary"
    clipped-right
    clipped-left
    dark
  >
    <v-app-bar-nav-icon @click="drawer = !drawer" />
    <final-logo />
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue'
import Logo from '~/components/VuetifyLogo.vue'

export default Vue.extend({
  name: 'FrontEndAppBar',

  components: {
    FinalLogo: Logo
  },

  computed: {
    drawer: {
      get() {
        return this.$accessor.drawer
      },
      set(value: boolean) {
        this.$accessor.setDrawer(value)
      }
    }
  },

  methods: {

  }
})
</script>

<style scoped></style>
