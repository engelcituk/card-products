<template>
  <div>
    <div class="mt-5" v-if="!isloadingProducts">
      <b-row>
        <b-col md="6">
          <DropdownCategories />
        </b-col>
      </b-row>
      <b-row v-if="filteredProducts.length > 0">
        <b-col md="3" v-for="product in filteredProducts" :key="product.id" >
          <Product :product="product" md="4"/>
        </b-col>
      </b-row>               
      <b-row v-if="filteredProducts.length = 0">
        <b-col md="12"  >
          Sín productos
        </b-col>
      </b-row> 
    </div>
    <div class="text-center mt-5" v-if="isloadingProducts">
        <b-spinner label="Loading..." variant="success" /><br />
        <strong>Cargando productos</strong>
    </div>
  </div>     
</template>

<script>
import { mapState, mapActions,  mapGetters, mapMutations } from 'vuex'
import Product from '@/modules/products/components/Product'
import DropdownCategories from '@/modules/products/components/DropdownCategories'
import { toJson } from '@/helpers/helpers'

import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios' 
export const baseUrl = process.env.VUE_APP_BASE_URL_API

export default {
  name: 'Products',
  props:{
    tokenApp:{
      type: String,
      required: true
    }
  },
  components: {
    Product,
    DropdownCategories
  },
  async mounted(){    
    axios.defaults.headers.common['Authorization'] = 'Token '+ this.tokenApp
    axios.defaults.baseURL = baseUrl
    Vue.use(VueAxios, axios)// end
    await this.loginApp()  
    this.setLoadingProducts(true)
    await this.getInitialContent()       
    this.setLoadingProducts(false)
    this.setCategoryInPage()

  },
  
  computed:{
    ...mapGetters('products',['filteredProducts']),  
    ...mapState('products',['isloadingProducts','categories']),  

  },
  methods:{
    ...mapActions('auth',['loginWeb']),  
    ...mapActions('products',['getInitialContent','getAnotherInitialContent']), 
    ...mapMutations('auth',['logout','setUser','setDataQueryParams']),          
    ...mapMutations('products',['setLoadingProducts','setSelectedCategory']),          

    async loginApp(){
      const { ok, user } = await this.loginWeb( this.tokenApp )
      this.setDataQueryParams({token:this.tokenApp})
      if(ok){
        this.setUser( user )
      }
      if(!ok){
        this.logout() 
        this.setDataQueryParams(null)
      }
    },
    setCategoryInPage(){
      const { defaults, hotels, services } = this.categories
      const myCategories =  [...defaults, ...hotels, ...services ] 
      if( this.filteredProducts.length > 0 ){
        const valueCategory = this.filteredProducts[0].valueFromCategory
        const categoria = toJson(myCategories.find( cat => cat.value === valueCategory ) ) //category para setear el state selectedCategory in start module  
        this.setSelectedCategory( categoria )
      }
      if( this.filteredProducts.length == 0 ){
        this.setSelectedCategory( {section:'Categories', action: 'get-products-best-seller',text: 'Best Seller', value: 'BestSeller-01'} )                
      }
    }
  }
}
</script>