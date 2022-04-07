
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vueCustomElement from 'vue-custom-element'

// (optional) 'Custom elements polyfill'
import 'document-register-element/build/document-register-element'

import './index.css'

require('./plugins')
Vue.config.productionTip = false
Vue.use(vueCustomElement)
App.store = store
Vue.customElement('card-products', App)
/*
npm run build -- --target wc --name product-cards src\main.js
https://www.telerik.com/blogs/passing-variables-to-css-on-a-vue-component
*/
// npm run lint -- --fix