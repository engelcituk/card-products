<template>
    <div>
        <b-dropdown
            id="dropdown-grouped"            
            variant="primary"
            right
            :text="selectedCategory ? selectedCategory.section :'Tipos de categorías'"
        >
            <b-dropdown-group
                header="Servicios hoteleros"
            >
                <b-dropdown-item v-for="cat in categories.hotels" :key="cat.value" @click="getProducts(cat.value)">{{cat.text}}</b-dropdown-item>        
            </b-dropdown-group>
            
            <b-dropdown-divider />

            <b-dropdown-group
                header="Categorías"
            >
                <b-dropdown-item v-for="cat in categories.defaults" :key="cat.value" @click="getProducts(cat.value)" >{{cat.text}}</b-dropdown-item>        
            </b-dropdown-group>

            <b-dropdown-divider />

            <b-dropdown-group
                header="Servicios"
            >
                <b-dropdown-item v-for="cat in categories.services" :key="cat.value" @click="getProducts(cat.value)" >{{cat.text}}</b-dropdown-item>        
            </b-dropdown-group>
        </b-dropdown>
        <b-badge variant="primary" class="ml-1 mr-2" v-if="selectedCategory">            
            <span> {{ selectedCategory ? selectedCategory.text :'' }}</span>
        </b-badge>
        <b-icon-cart-check-fill style="color:#333366;"></b-icon-cart-check-fill>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex'
import { toJson } from '@/helpers/helpers'

export default {
   
    computed:{    
    ...mapState('products',['categories','selectedCategory', 'isloadingProducts']),    
    ...mapGetters('products',['filteredProducts']),     
  },
    methods:{
        ...mapActions('products',['fetchProducts','fetchProductsByCategories','fetchPackages','fetchEvents']),        
        ...mapMutations('products',['setProducts','setLoadingProducts','setSelectedCategory']),
        async getProducts( valueCategory ){ 
            let products = []      
            const { defaults, hotels, services } = this.categories
            const myCategories =  [...defaults, ...hotels, ...services ]
            const categoria = toJson(myCategories.find( cat => cat.value === valueCategory ) ) //category para la peticion     
            
            const { action } = categoria
            this.setLoadingProducts(true)
            if( action == 'get-products-best-seller' ){
                products = await this.fetchProducts() 
            }
            if( action == 'get-products-by-category'){                                
                products = await this.fetchProductsByCategories( categoria )                              
            }        
            if( action == 'get-packages' ){
                products = await this.fetchPackages()               
            } 
            if( action == 'get-events' ){
                products = await this.fetchEvents()                       
            }
            this.setSelectedCategory( categoria )
            this.setProducts( products )
            this.setLoadingProducts(false)

        }
    }
}
</script>
<style scoped>

.btn-primary {
    color: #fff;
    background-color: #333366!important;
    border-color: #333366!important;
}
</style>