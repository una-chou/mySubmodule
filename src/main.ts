import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ApiClient from '@/plugins/api-client'

// 去除bluebird的警告
;(Promise as any).config({
  warnings: false,
})

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $axios: any
  }
}

const app = createApp(App)

app
  .use(store)
  .use(router)
  .use(ApiClient)
  .mount('#app')
