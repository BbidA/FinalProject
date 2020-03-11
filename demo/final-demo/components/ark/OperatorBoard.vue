<template>
  <v-row>
    <v-col>
      <operator-card />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import OperatorCard from './OperatorCard.vue'

export default Vue.extend({
  name: 'OperatorBoard',
  components: { OperatorCard },
  props: {
    nameFilter: {
      type: String,
      default: ''
    }
  },
  methods: {
    filterOperators() {
      // Filter operators according to nameFilter prop
    }
  }
})
</script>

<style scoped></style>
