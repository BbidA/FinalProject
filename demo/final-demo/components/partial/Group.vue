<template>
  <v-list-group
    :prepend-icon="item.icon"
    :sub-group="subGroup"
    :group="group"
    no-action
  >
    <template v-slot:activator>
      <v-list-item-content>
        <v-list-item-title>
          {{ $t(item.text) }}
        </v-list-item-title>
      </v-list-item-content>
    </template>
    <template v-for="(child, index) in children">
      <base-group
        v-if="child.group"
        :key="`subgroup-${index}`"
        sub-group
        :item="child"
      />

      <base-item
        v-else
        :key="`item-${index}`"
        :icon="child.icon"
        :subtext="child.subtext"
        :to="child.to"
        :text="child.text"
      />
    </template>
  </v-list-group>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import keybabCase from 'lodash/kebabCase'
import BaseItem from './Item.vue'
import { DrawerItem } from '~/store'

export default Vue.extend({
  name: 'BaseGroup',
  components: {
    BaseItem
  },
  props: {
    item: {
      type: Object,
      required: true
    } as PropOptions<DrawerItem>,
    subGroup: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    children(): DrawerItem[] {
      return this.item.children!.map(child => ({
        ...child,
        to: `${this.item.group}/${child.to}`
      }))
    },
    group(): string {
      const result = this.generateGroup(this.item.children!)
      return result
    }
  },
  methods: {
    // Need to understand the usage of <v-list-group>'s property 'group'
    // Example: ai-platform/gradient-descent|ai-platform/cnn|ai-platform/|ai-platform/rnn                                                                                        17:26:25
    //          arknights/material-calculator|arknights/planner
    generateGroup(children: DrawerItem[]): string {
      return children
        .map(item => {
          const parent = item.group || this.item.group
          let group = `${parent}/${keybabCase(item.to)}`

          if (item.children) {
            // The final result is like component/|[component/api-explorer,]
            group = `${group}|${this.generateGroup(item.children)}`
          }
          return group
        })
        .join('|')
    }
  }
})
</script>

<style scoped></style>
