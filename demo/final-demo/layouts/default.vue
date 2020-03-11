<template>
  <v-fade-transition mode="out-in">
    <v-app>
      <base-app-bar />
      <base-drawer />
      <v-content>
        <v-responsive class="mx-auto" max-width="75%">
          <v-container>
            <nuxt />
          </v-container>
        </v-responsive>
      </v-content>
      <v-footer absolute app>
        <span>&copy; 2019</span>
      </v-footer>
    </v-app>
  </v-fade-transition>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseAppBar from '~/components/partial/AppBar.vue'
import BaseDrawer from '~/components/partial/Drawer.vue'

export default Vue.extend({
  components: {
    BaseAppBar,
    BaseDrawer
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
})
</script>
