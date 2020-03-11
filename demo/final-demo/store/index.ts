import { getAccessorType } from 'typed-vuex'
import * as ark from './ark'
import drawerItems, { DrawerItem as DItem } from '~/data/drawerItems'

export const state = () => ({
  drawer: false,
  links: drawerItems,
  locales: ['en', 'zh-CN'],
  locale: 'zh-CN'
})

export type RootState = ReturnType<typeof state>
export type DrawerItem = DItem

// Mutations
export const mutations = {
  setDrawer(state: RootState, value: boolean) {
    state.drawer = value
  },
  setLang(state: RootState, lang: string) {
    state.locale = lang
  }
}

export const accessorType = getAccessorType({ state, mutations, modules: { ark } })
