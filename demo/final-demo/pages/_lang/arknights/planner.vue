<template>
  <div>
    <v-card outlined class="my-2">
      <!-- Toolbar -->
      <v-toolbar height="auto" flat color="primary" dark>
        <v-container class="px-0">
          <v-row no-gutters>
            <!-- Title -->
            <v-col cols="12" md="4" style="align-self: center">
              <div class="headline">
                {{ $t('Ark.Planner.filterTitle') }}
              </div>
            </v-col>

            <!-- Search Operators -->
            <v-col cols="12" md="4" offset-md="4">
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                clearable
                color="white"
                hide-details
                label="Search..."
                outlined
                type="search"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-toolbar>

      <!-- Tags -->
      <v-container>
        <ark-tag-group
          v-for="category in Object.keys(tags)"
          :key="category"
          :tags="tags[category]"
          :category="category"
        />
      </v-container>

      <!-- Clear Tags -->
      <v-row>
        <v-col class="text-center">
          <v-btn class="float-md-right mx-2" color="red" dark large @click="clearTags">
            {{ $t('Ark.Planner.clearTags') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-card>

    <!-- Operator Board -->
    <ark-operator-board class="my-2" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ArkTagGroup from '~/components/ark/ArkTagGroup.vue'
import ArkOperatorBoard from '~/components/ark/OperatorBoard.vue'
import arkTags from '~/data/arkTags'

export default Vue.extend({
  components: {
    ArkTagGroup,
    ArkOperatorBoard
  },
  data() {
    return {
      tags: arkTags,
      search: ''
    }
  },
  methods: {
    clearTags() {
      this.$accessor.ark.clearTags()
    }
  }
})
</script>

<style scoped></style>
