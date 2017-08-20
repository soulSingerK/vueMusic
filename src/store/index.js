import vue from 'vue'
import vuex from 'vuex'
import * as actions from './actions'
import mutations from './mutations'
import * as getters from './getters'
import state from './state'
import createLogger from 'vuex/dist/logger'

vue.use(vuex)
const debug = process.env.NODE_ENV !== 'production'
export default new vuex.Store({
  actions,
  mutations,
  getters,
  state,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})