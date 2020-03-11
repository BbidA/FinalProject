<template>
  <div :id="category">
    <v-row no-gutters justify="center" align="center">
      <!-- Title -->
      <v-col cols="2" style="max-width: 120px; align-self: start">
        <div class="subtitle-1 mt-2">
          {{ $t(`Ark.ArkTags.${category}`) }}
        </div>
      </v-col>

      <!-- Tags -->
      <v-col cols="10" class="pa-1">
        <v-item-group v-model="selected" multiple>
          <v-item
            v-for="item in tags"
            v-slot:default="{ active, toggle }"
            :key="item"
            :value="item"
          >
            <v-btn
              :color="active ? 'primary' : 'grey darken-3'"
              class="ma-1"
              tile
              dark
              max-width="300px"
              min-width="100px"
              min-height="40px"
              @click="toggle"
            >
              <div v-if="typeof item !== 'number'">
                {{ $t(`Ark.ArkTags.${item}`) }}
              </div>
              <div v-else>
                {{ item }}
                <v-icon size="medium" style="margin-bottom: 2px !important">
                  mdi-star
                </v-icon>
              </div>
            </v-btn>
          </v-item>
        </v-item-group>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { TagCategory } from '~/store/ark'

export default Vue.extend({
  name: 'ArkTagGroup',
  props: {
    tags: {
      type: Array,
      required: true
    },
    category: {
      type: String,
      required: true
    } as PropOptions<TagCategory>
  },
  computed: {
    selected: {
      get(): string[] | number[] {
        return this.$accessor.ark.selectedTags[this.category]
      },
      set(value: []): void {
        this.$accessor.ark.setTags({ category: this.category, value })
      }
    }
  }
})
</script>

<style scoped></style>
