<template>      
    <div>
      <main class="main-container" v-if="!isloadingProducts">
        <DropdownCategories />
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
import DropdownCategories from '@/modules/products/components/DropdownCategories'
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
    DropdownCategories
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
  margin-block-start: 2rem;   
  margin-block-end: 2rem;  
  margin-inline-start: 2rem;   
  margin-inline-end: 2rem;  
  font-family: 'Roboto', sans-serif;
}
.main-header {  
  display: flex;
  flex-direction: column; 
  gap: 1rem;
  margin-block-end: 1rem;  
  align-items: center;
}
.cards-list {  
  display: flex;
  flex-direction: column; 
  gap: 1rem;
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
  .main-header {
    flex-direction: row;
    gap: 1rem;
    margin-block-start: 3rem;   
    justify-content: space-between;
  }
  .cards-list {
    flex-direction: row;
    gap: 1rem;
  }
}

.dropdown {
	 position: relative;
}
 .dropdown__btn {
	 
	 padding: .8rem;
	 border: none;
	 font-size: inherit;
	 color: #f8f8f8;
	 font-family: inherit;
	 cursor: pointer;
	 background-color: #333366;
	 border-radius: 5px;
	 /* z-index: 2; */
   /* border: 1px solid#333366; */
}
 .dropdown__list {
	 position: absolute;
	 /* left: 1.5rem; */
	 top: 3.5rem;
	 width: max-content;
	 display: flex;
	 flex-direction: column;
	 padding-top: 10px;
	 border-radius: 3px;
	 overflow: hidden;
	 transform: translateY(-20%);
	 visibility: hidden;
	 opacity: 0;
	 transition: all 0.25s;
	 z-index: 1;
	 background-color: #dfdfdf;

}
 .dropdown__item {
	 display: flex;
	 align-items: center;
	 justify-content: flex-start;
	 padding: 1rem 1.5rem;
	 font-size: 1rem;
	 text-decoration: none;
	 color: #383838;
	 /* background-color: rgba(112, 102, 204, 0.1); */
	 transition: background-color 0.2s;
}
 .dropdown__item:first-child {
	 border-radius: 3px 3px 0 0;
}
 .dropdown__item:hover {
	 background-color: rgba(44, 43, 54, 0.3);
}

 .dropdown:hover .dropdown__btn {
	 color: #000000;
}
 .dropdown:hover .dropdown__list {
	 transform: translateY(0);
	 visibility: visible;
	 opacity: 1;
}

/* badge */
.badge-header{
	 box-sizing: border-box;
	 display: inline-block;
	 background-color: #2ecc71;
	 color: #fff;
	 border-radius: .5rem;
	 text-align: center;
	 font-weight: 400;
   font-size: 1rem;
	 padding: 0.2rem ;
}
 
 
 
</style>