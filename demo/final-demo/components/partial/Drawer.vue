<template>
  <v-navigation-drawer v-model="drawer" :right="$vuetify.rtl" :width="300" app clipped>
    <v-list class="pt-0 pb-7" expand nav>
      <template v-for="(item, index) in items">
        <v-subheader v-if="item.subheader" :key="`subheader-${index}`">
          {{ item.subheader }}
        </v-subheader>

        <v-divider v-else-if="item.divider" :key="`divider-${index}`" />

        <base-group v-else-if="item.group" :key="`group-${index}`" :item="item" />

        <base-item
          v-else
          :key="`item-${index}`"
          :text="item.text"
          :icon="item.icon"
          :subtext="item.subtext"
          :to="item.to"
        />
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseGroup from './Group.vue'
import BaseItem from './Item.vue'
import { DrawerItem } from '~/store'

export default Vue.extend({
  components: {
    BaseGroup,
    BaseItem
  },
  computed: {
    items(): DrawerItem[] {
      return this.$accessor.links.map(this.addLanguagePrefix)
    },
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
    addLanguagePrefix(item: DrawerItem): DrawerItem {
      const { children, subtext, ...prop } = item
      const newItem: DrawerItem = {
        ...prop,
        text: `AiApp.AppDrawer.${item.text}`
      }

      if (subtext) {
        newItem.subtext = `AiApp.AppDrawer.${item.subtext}`
      }

      if (children) {
        newItem.children = children.map(this.addLanguagePrefix)
      }

      return newItem
    }
  }
})
</script>

<style scoped></style>
