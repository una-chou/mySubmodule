import {createApp} from 'vue'
import ApiClient from '@/utils/api-client'
export default {
  install: (app: ReturnType<typeof createApp>): void => {
    app.config.globalProperties.$axios = ApiClient
  },
}
