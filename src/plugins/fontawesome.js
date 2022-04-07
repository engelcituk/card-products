import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faCartPlus, faLink, faInfoCircle} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret)
library.add(faCartPlus)
library.add(faLink)
library.add(faInfoCircle)



Vue.component('font-awesome-icon', FontAwesomeIcon)