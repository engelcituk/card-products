<template>
  <div>
    <div class="mt-5" v-if="!isLoadingProducts">
      <b-row >
        <b-col md="3" v-for="product in filteredProducts" :key="product.id" >
          <Product :product="product" md="4"/>
        </b-col>
      </b-row>               
      
    </div>
    <div class="text-center mt-5" v-if="isLoadingProducts">
          <b-spinner label="Loading..." variant="success" /><br />
          <strong>Cargando productos</strong>
      </div>
  </div>     
</template>

<script>
import { mapState, mapActions,  mapGetters, mapMutations } from 'vuex'
import { overWriteAxiosHeaders } from '@/helpers/helpers'
import Product from '@/modules/products/components/Product'

export default {
  name: 'Products',
  props:{
    tokenApp:{
      type: String,
      required: true
    }
  },
  components: {
    Product
  },
  async mounted(){
    await overWriteAxiosHeaders( {token:this.tokenApp} ) //sobreescribo axios    
    await this.loginApp()  
    this.isLoadingProducts = true
    await this.getInitialContent()       
    this.isLoadingProducts = false

  },
  data(){
    return {
      isLoadingProducts: false
    }
  },
  computed:{
    ...mapGetters('products',['filteredProducts']),  
  },
  methods:{
    ...mapActions('auth',['loginWeb']),  
    ...mapActions('products',['getInitialContent','getAnotherInitialContent']), 
    ...mapMutations('auth',['logout','setUser','setDataQueryParams']),          
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
  }
}
</script>