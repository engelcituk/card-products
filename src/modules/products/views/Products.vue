<template>      
    <div>
      <main class="main-container" v-if="!isloadingProducts">
        <Header />
        <div class="cards-list">          
          	<div class="product-card" v-for="product in filteredProducts" :key="product.id">
              <Product :product="product"/>
          </div>                    
        </div>
      </main> 
      <Loader v-else/>         
    </div>
</template>

<script>
import { mapState, mapActions,  mapGetters, mapMutations } from 'vuex'
import Product from '@/modules/products/components/Product'
import Header from '@/modules/products/components/Header'
import Loader from '@/modules/products/components/Loader'

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
    Loader,
    Product,
    Header
  },
  data(){
    return {
      imgUrl: process.env.VUE_APP_IMG_SRC_API,
    //   imdDefault: require('@/assets/images/default.jpg')      
    }
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
  // https://codepen.io/mdshifut/pen/VrwBJq
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700');

.main-container{  
  flex-direction: column;
  /* margin-block-start: 2rem;   
  margin-block-end: 2rem;  
  margin-inline-start: 2rem;   
  margin-inline-end: 2rem;   */
  font-family: 'Roboto', sans-serif;
}

.cards-list {  
  display: flex;
  flex-direction: column;   
  gap: 1rem;  
  align-items: center;
  
}
.product-card {
  width: 300px;
  position: relative;
  box-shadow: 0 2px 7px #dfdfdf;
  /* margin: 50px auto; */
  background: #fafafa;
}

@media screen and (min-width: 768px) {
  .main-container  {
    /* display: flex; */
    margin: auto;  
    margin-block-start: 3rem;   
    margin-block-end: 3rem;   
    width: 1024px;  
  }  
  .cards-list {
    flex-direction: row;
    gap: 1rem;
  }
  .product-card {
    width: 450px;
    position: relative;
    box-shadow: 0 2px 7px #dfdfdf;
    background: #fafafa;
  }

}

 
 
</style>