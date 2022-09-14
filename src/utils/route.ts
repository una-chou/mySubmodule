import cookie from 'js-cookie'

export function redirectToLogin(locale: string, redirectTo = ''): void {
  let gotinFrom: string
  if (redirectTo) {
    gotinFrom = redirectTo
  } else {
    gotinFrom = window.location.href
  }
  const domain: string = process.env.VUE_APP_LOGIN_DOMAIN

  cookie.set('gotinFrom', gotinFrom, {expires: 1, domain})

  location.href =
    process.env.NODE_ENV === 'development'
      ? `${location.protocol}//${location.hostname}:8090/login_page?lang=${locale}`
      : process.env.VUE_APP_LOGIN_URL + '?lang=' + locale
}
