import { getAccessorType } from 'nuxt-typed-vuex'

export const state = () => ({
  selectedTags: {
    career: [] as string[],
    star: [] as number[],
    position: [] as string[],
    affix: [] as string[]
  }
})

export type ArkState = ReturnType<typeof state>
export type TagCategory = keyof ArkState['selectedTags']

export const mutations = {
  setTags(state: ArkState, payload: { category: keyof ArkState['selectedTags']; value: [] }) {
    state.selectedTags[payload.category] = payload.value
  },
  clearTags(state: ArkState) {
    Object.keys(state.selectedTags).forEach(key => {
      state.selectedTags[key as TagCategory] = []
    })
  }
}

export const accessorType = getAccessorType({ state, mutations })
