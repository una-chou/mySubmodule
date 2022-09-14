import {createStore, Store} from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import mutations from './mutations'
import modules from './modules'
import {StateType} from '@/types'
import {InjectionKey} from 'vue'

export const key: InjectionKey<Store<StateType>> = Symbol()

const store: Store<StateType> = createStore({
  strict: process.env.NODE_ENV !== 'production',
  mutations,
  actions: {},
  modules: {...modules},
  plugins: [
    createPersistedState({
      key: 'state',
      paths: ['user', 'database'],
    }),
  ],
})

export default store
