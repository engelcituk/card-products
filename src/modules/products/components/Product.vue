<template>
    <!-- <b-col md="4"> -->
        <b-card :title="product.name"  class="mt-2 h-100" img-top no-body >
        <b-img
            fluid        
            :alt="`${product.name}-${product.id}`"
            :src="imgUrl + product.coverImage"                
        />
        <b-card-body>
            <b-card-text>
             <h6 class="item-name">
                <b-link
                    class="text-body"
                
                > {{ product.name }}
                </b-link>
                <!-- <b-card-text class="mt-1 text-muted"> Categoría: {{product.categoryName}}
                </b-card-text> -->
            </h6>
            </b-card-text>
            <b-card-text              
                class="text-justify short-description"
            >
                <div v-html="product.description"></div>              
            </b-card-text>
        </b-card-body>
            <div class="mt-1 btn-options">
              <button class="custom-btn btn-13" @click="selectItem"><b-icon-star-fill :style="isSelectedItem"> </b-icon-star-fill></button>
              <button class="custom-btn btn-13" @click="selectProduct" > <b-icon-link45deg> </b-icon-link45deg></button>
            </div>
        </b-card>
    <!-- </b-col> -->
</template>

<script>
import { mapMutations } from 'vuex'
import { toJson } from '@/helpers/helpers'
export default {
  name: 'Product',  
  props:{
    product:{
      type: Object,
      required: true
    }
  },  
  data(){
    return {
      imgUrl: process.env.VUE_APP_IMG_SRC_API,
    //   imdDefault: require('@/assets/images/default.jpg')      
    }
  },
  computed:{
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
      const url = `?payload=${JSON.stringify(payload)}`
      console.log( url )
    },
    selectItem(){      
      const item = {... toJson( this.product ) }
      this.product.isSelected = !item.isSelected   

      const payload = {
        product: item.id,
        detail: item.detailSelected.id,
        type: `${item.modelType}s`,
        isSelected: this.product.isSelected
      }                      
      this.addToItemsSelected(payload)     
    }
  }
}
</script>

<style scoped>

.short-description {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.long-description {
  display: -webkit-box;
  -webkit-line-clamp: 10;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.btn-options{
  display: flex;
  justify-content: space-around;
  gap: 1rem;
  padding-block-end: 1rem;
}

.custom-btn {
  
  color: #fff;
  border-radius: 5px;
  padding: 10px 25px;
  font-family: 'Lato', sans-serif;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  /* display: inline-block; */
  /* box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5),
   7px 7px 20px 0px rgba(0,0,0,.1),
   4px 4px 5px 0px rgba(0,0,0,.1); */
  /* outline: none; */
}

/* 13 */
.btn-13 {
  background-color: #333366 ;
  background-image: linear-gradient(315deg, #333366  0%, #333366 74%);
  border: none;
  z-index: 1;
}
.btn-13:after {
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
.btn-13:hover {
  color: #fff;  
}
.btn-13:hover:after {
  top: 0;
  height: 100%;
}
.btn-13:active {
  top: 2px;
}


</style>