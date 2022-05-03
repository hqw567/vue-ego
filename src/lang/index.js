import Element from 'element-ui'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import cn from './cn'
import en from './en'

Vue.use(VueI18n)

const messages = {
  en: {
    message: 'hello',
    ...en,
    ...enLocale // 或者用 Object.assign({ message: 'hello' }, enLocale)
  },
  'zh-cn': {
    message: '你好',
    ...cn,
    ...zhLocale // 或者用 Object.assign({ message: '你好' }, zhLocale)
  }
}
// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'zh-cn', // set locale
  messages // set locale messages
})

Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)
})

export default i18n
