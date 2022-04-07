<template>
    <!-- <div>
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
                
        <button class="btn btn-success" @click="openCart" v-if="itemsSelected.length > 0"><b-icon-cart-check-fill style="color:#333366;"></b-icon-cart-check-fill> Products selected {{ itemsSelected.length }}</button>
    </div> -->
    <div class="main-header">
          <div class="dropdown">
            <button class="dropdown__btn">
                <font-awesome-icon icon="list-dots" />  Categorías
            </button>
            <div class="dropdown__list">
              <a href="#" class="dropdown__item">Jazz </a>
              <a href="#" class="dropdown__item">Rock'n'Roll </a>
              <a href="#" class="dropdown__item">World Music </a>
              <a href="#" class="dropdown__item">R'n'B </a>
            </div>
          </div>
          <div>
            <span class="badge-header">The fives hotels</span>
          </div>
          <div>
            <button class="dropdown__btn">
               Products selected: {{ itemsSelected.length }} <font-awesome-icon icon="cart-plus" />
            </button>
          </div>
        </div>
</template>

<script>
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex'
import { toJson, generarJWT } from '@/helpers/helpers'

export default {
   
    computed:{    
    ...mapState('auth',['queryParams']),  
    ...mapState('products',['categories','selectedCategory', 'isloadingProducts','itemsSelected']),    
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
        },
        openCart(){
            let items = []            
            this.itemsSelected.forEach(item => {
                const product = {
                    product: item.product,
                    detail: item.detail,
                    type: item.type
                }
                items.push(product)
            })
            const token =  this.createHeadersPayload()
            const data = { token, items } 
            const jwt = generarJWT(data)
            const url = `?payload=${jwt}`
            console.log( url )
        },
        createHeadersPayload(){
            return this.queryParams.token         
        }
    }
}
</script>
<style  scoped>
.main-header {  
  display: flex;
  flex-direction: column; 
  gap: 1rem;
  margin-block-end: 1rem;  
  align-items: center;
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
	 color: #eeeaea;
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
 
@media screen and (min-width: 768px) {
  
  .main-header {
    flex-direction: row;
    gap: 1rem;
    margin-block-start: 3rem;   
    justify-content: space-between;
  }
  
}

</style>