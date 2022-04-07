<template>    
    <div>
      <!-- <div class="open-detail">
        <button class="custom-btn btn-option" @click="selectProduct" ><font-awesome-icon icon="link" /></button>
      </div> -->
      <div class="open-link">
        <button class="custom-btn btn-option" @click="selectProduct" ><font-awesome-icon icon="link" /></button>
      </div>
      <div class="product-tumb">
        <img :src="imgUrl + product.coverImage" alt="">
      </div>
      <div class="product-details">        
        <h4>{{ product.name }}</h4>
        <div class="short-description" >
          <div v-html="product.description"></div>              
        </div>                          
        <div  class="show-more" @click="showModal = true">Show more..</div>            
      </div>
      <div class="btn-options">
        <!-- <button class="custom-btn btn-option" @click="showModal">A</button>         -->
        <div class="product-price">${{product.detailSelected.saleprice}}</div>
        <!-- <button class="custom-btn btn-option" @click="selectProduct" ><font-awesome-icon icon="info-circle" /></button> -->
        <button class="custom-btn btn-option" @click="selectItem"><font-awesome-icon icon="heart" /></button> <!-- :style="isSelectedItem" -->
      </div>
      <ProductDetail :product="product" v-show="showModal" @close-modal="showModal = false" />
    </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import ProductDetail from '@/modules/products/components/ProductDetail'
import { toJson, generarJWT, decodeJwt } from '@/helpers/helpers'



export default {
  name: 'Product',  
  props:{
    product:{
      type: Object,
      required: true
    }
  }, 
  components:{
    ProductDetail
  } ,
  data(){
    return {
      imgUrl: process.env.VUE_APP_IMG_SRC_API,
      showModal: false,

    //   imdDefault: require('@/assets/images/default.jpg')      
    }
  },
 
  computed:{
    ...mapGetters('products',['filteredProducts']),  
    ...mapState('products',['isloadingProducts','categories']),  
    ...mapState('auth',['queryParams']),  

    isSelectedItem(){
      return this.product.isSelected ? 'color:#ffab00;':'color:white;'
    }
  },
  methods:{
    ...mapMutations('products',['setIsSelected','addToItemsSelected']),
    selectProduct(){
      const item = {... toJson( this.product ) }
      const payload = {
        product: item.id,
        detail: item.detailSelected.id,
        type: `${item.modelType}s`  
      }
      const token = this.createHeadersPayload()      
      const jwt = generarJWT({ token, items:[payload] })
      const url = `?payload=${jwt}`
      console.log( url )
      console.log( decodeJwt(jwt) )
    },
    selectItem(){      
      const item = {... toJson( this.product ) }
      this.product.isSelected = !item.isSelected   

      const payload = {
        product: item.id,
        detail: item.detailSelected.id,
        type: `${item.modelType}s`,
        isSelected: this.product.isSelected,
        key: item.uuid
      }          
      this.addToItemsSelected(payload)     
    },
    createHeadersPayload(){
      return this.queryParams.token                 
    },        
  }
}
</script>

<style scoped>
.open-link {
    position: absolute;
    right: .5rem;
    top: 20px;    
    font-size: 13px;
    color: #fff;
    /* padding: 3px 10px; */    
}

.open-detail {
    position: absolute;
    left: .5rem;
    top: 20px;    
    font-size: 13px;
    color: #fff;
    /* padding: 3px 10px; */    
}

.product-tumb {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 180px;    
    background: #f0f0f0;
}

.product-tumb img {
  width: 100%;
  height: 180px;
}

.product-details {
  /* padding: ;  */
  padding-block-end: 1rem;   
  padding-inline-start: 1rem;   
  padding-inline-end: .5rem;   
  border-bottom: 2px solid #eee7e7;  
}

.product-details h4 {
  margin-block-start: 1rem;
  margin-block-end: -.5rem;
}
.product-details h4:hover {
  color: #fbb72c;
}

.product-details p {
    font-size: 15px;
    line-height: 22px;
    margin-bottom: 5px;
    /* padding: 1rem; */
    color: #999;
}

.product-price {
    font-size: 1rem;    
    color: #363636;
    font-weight: 600;
}

.product-price:hover {    
  color: #fbb72c;    
}

.short-description {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.btn-options{
  display: flex;
  justify-content: space-between;
  align-items: center;  
  padding-inline-start: .5rem;
  padding-inline-end: .5rem;
  padding-block-start: 1rem;
  padding-block-end: 1rem;
}

.custom-btn {  
  color: #fff;
  border-radius: 5px;
  padding: 10px 10px;
  font-family: 'Lato', sans-serif;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;  
}

.show-more{
    font-weight: 500;
    cursor: pointer;
    font-size: .9rem;
    /* text-align: left; */
}
.btn-option {
  background-color: #333366 ;
  background-image: linear-gradient(315deg, #333366  0%, #333366 74%);
  border: none;
  z-index: 1;
}
.btn-option:after {
  position: absolute;
  content: "";
  width: 100%;
  height: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  border-radius: 5px;
  background-color: #333366 ;
  background-image: linear-gradient(315deg, #333366  0%, #333366 74%);
  box-shadow:
   -7px -7px 20px 0px #fff9,
   -4px -4px 5px 0px #fff9,
   7px 7px 20px 0px #0002,
   4px 4px 5px 0px #0001;
  transition: all 0.3s ease;
}
.btn-option:hover {
  color: #fff;  
}
.btn-option:hover:after {
  top: 0;
  height: 100%;
}
.btn-option:active {
  top: 2px;
}

/* Estilos para modal */
</style>