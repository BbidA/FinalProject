import camelCase from 'lodash/camelCase'
import upperFirst from 'lodash/upperFirst'
import { LocaleMessageObject } from 'vue-i18n'

const files = require.context('./', true, /\.json$/)
const messages: LocaleMessageObject = {}

files.keys().forEach(fileName => {
  if (fileName === './index.ts') {
    return
  }

  const path = fileName.replace(/(\.\/|\.json$)/g, '').split('/')

  // Convert directory to outside object and json file to nested object
  // i.e. { "GettingStarted": { "BrowserSupport": json-object } }
  path.reduce((prev, curr, index) => {
    const prop = upperFirst(camelCase(curr))

    prev[prop] = index + 1 === path.length ? files(fileName) : prev[prop] || {}

    return prev[prop] as LocaleMessageObject
  }, messages)
})

export default messages as LocaleMessageObject
