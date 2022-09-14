import {createI18n} from 'vue-i18n'
import {getLang} from '@/utils/storage'
const files = require.context('.', true, /\.ts$/)
const messages: any = {}

files.keys().forEach(key => {
  if (key === './index.ts') return
  const path = key.replace(/(\.\/|\.ts)/g, '')
  const [locale, namespace, module] = path.split('/')
  if (!messages[locale]) {
    messages[locale] = {}
  }

  if (!messages[locale][namespace]) {
    messages[locale][namespace] = {}
  }

  messages[locale][namespace][module] = files(key).default
})

// 注册i8n实例并引入语言文件
const i18n = createI18n({
  legacy: false,
  locale: getLang(),
  messages,
})

export default i18n
