import Vue from 'vue'
import Vuex from 'vuex'
import auth from '@/modules/auth/store'
import products from '@/modules/products/store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {        
    auth, 
    products
  },
  strict: process.env.DEV,
})