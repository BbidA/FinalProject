<template>
  <v-list-item :to="path">
    <v-list-item-icon v-if="icon">
      {{ icon }}
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title>
        {{ $t(text) }}
      </v-list-item-title>
      <v-list-item-subtitle v-if="subtext">
        {{ subtext }}
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    text: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      default: ''
    },
    to: {
      type: String,
      default: ''
    },
    subtext: {
      type: String,
      default: ''
    }
  },
  computed: {
    path(): { path: string } | string {
      if (!this.to) {
        return this.to
      }

      const lang = this.$route.params.lang || this.$i18n.fallbackLocale
      return { path: `/${lang}/${this.to}` }
    }
  }
})
</script>

<style scoped></style>
