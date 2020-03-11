const DItems: DrawerItem[] = [
  {
    group: 'ai-platform',
    text: 'aiPlatform',
    icon: 'mdi-view-dashboard',
    children: [
      { text: 'gradientDescent', to: 'gradient-descent' },
      { text: 'cnn', to: 'cnn' },
      {
        group: 'ai-platform',
        text: 'reinforcement',
        children: [
          { text: 'rnn', to: 'rnn' }
        ]
      }
    ]
  },
  {
    group: 'arknights',
    text: 'arknights',
    icon: 'mdi-atom-variant',
    children: [
      { text: 'materialCalcualtor', to: 'material-calculator' },
      { text: 'planner', to: 'planner' }
    ]
  }
]

export interface DrawerItem {
  group?: string
  text: string
  subtext?: string
  header?: string
  to?: string
  icon?: string
  children?: DrawerItem[]
  divider?: boolean
}

export default DItems
