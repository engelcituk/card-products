<template>
  
    <!-- <div class="mt-5" v-if="!isloadingProducts">
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
    </div> -->
      <main class="main-container">
        <div class="cards-list">
          <div class="card " v-for="product in filteredProducts" :key="product.id">
            <div class="card_image"> <img src="https://picsum.photos/200/300" /> </div>
            <div class="card_title title-white">
              <p>Card Title</p>
            </div>
          </div>
        </div>
      </main>            
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

<style scoped>
.main-container{
	display: flex;
  margin: auto;  
  margin-block-start: 3rem; 
  width: 1024px;  
}

.cards-list {
  z-index: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.card {
  margin: 10px auto;
  width: 300px;
  height: 300px;
  border-radius: 40px;
box-shadow: 5px 5px 30px 7px rgba(0,0,0,0.25), -5px -5px 30px 7px rgba(0,0,0,0.22);
  cursor: pointer;
  transition: 0.4s;
}

.card .card_image {
  width: inherit;
  height: inherit;
  border-radius: 40px;
}

.card .card_image img {
  width: inherit;
  height: inherit;
  border-radius: 40px;
  object-fit: cover;
}

.card .card_title {
  text-align: center;
  border-radius: 0px 0px 40px 40px;
  font-family: sans-serif;
  font-weight: bold;
  font-size: 30px;
  margin-top: -80px;
  height: 40px;
}

.card:hover {
  transform: scale(0.9, 0.9);
  box-shadow: 5px 5px 30px 15px rgba(0,0,0,0.25), 
    -5px -5px 30px 15px rgba(0,0,0,0.22);
}

.title-white {
  color: white;
}

.title-black {
  color: black;
}

@media all and (max-width: 500px) {
  .card-list {
    /* On small screens, we are no longer using row direction but column */
    flex-direction: column;
  }
}


/*
.card {
  margin: 30px auto;
  width: 300px;
  height: 300px;
  border-radius: 40px;
  background-image: url('https://i.redd.it/b3esnz5ra34y.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-repeat: no-repeat;
box-shadow: 5px 5px 30px 7px rgba(0,0,0,0.25), -5px -5px 30px 7px rgba(0,0,0,0.22);
  transition: 0.4s;
}
*/

</style>