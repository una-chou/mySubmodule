import {computed} from 'vue'
import {useI18n as vueUseI18n} from 'vue-i18n'
import {watch} from 'vue'
import {useStore} from 'vuex'
import {setLang} from '@/utils/storage'

export default function useI18n() {
  const {locale, ...rest} = vueUseI18n()
  const store = useStore()
  watch(locale, newLocale => {
    setLang(newLocale)
    const lang = store.state.event.currentDataLang
    document.title = store.state.event.event.asset[lang].title
  })

  const apiLocale = computed(() => {
    switch (locale.value) {
      case 'en':
        // return 'en-US'
        return 'zh-CN'
      case 'cn':
      default:
        return 'zh-CN'
    }
  })

  return {
    apiLocale,
    locale,
    ...rest,
  }
}
