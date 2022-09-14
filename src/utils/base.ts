import gotinLogin from '@frontend/gotin-sdk-login'

const loginSDK = new gotinLogin({
  continueUrl: process.env.VUE_APP_LOGIN_URL,
  baseUrl: process.env.VUE_APP_GATEWAY_URL,
  creationUrl: process.env.VUE_APP_CREATOR_URL,
})

export default loginSDK
