import ApiClient from '@/utils/api-client'

const i18nLanguage = 'i18nLanguage';
const getStorageKey = (userId: number, sessionId: string) => {
  return `session_password_${userId}_${sessionId}`
}

function defaultLocale() {
  //判断浏览器的首选语言
  if (navigator.language.indexOf("zh") >= 0) {
    return "cn";
  }
  return "en";
}

function setLang(value: any) {
  if (!value) {
    value = defaultLocale()
  }
  localStorage.setItem(i18nLanguage, value);
  // 同步请求头语言
  ApiClient.setI18n()
}

function getLang() {
  return localStorage.getItem(i18nLanguage) || defaultLocale()
}

export {getStorageKey, setLang, getLang}
