import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import msite from './modules/msite.js'
import user from './modules/user.js'
import shop from './modules/shop.js'
Vue.use(Vuex)
export default new Vuex.Store({
    mutations,
    actions,
    getters,
    modules:{
			msite:msite,
			user:user,
			shop:shop
    }
})