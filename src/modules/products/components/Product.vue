<template>
    <!-- <b-col md="4"> -->
        <b-card :title="product.name"  class="mt-2 h-100" img-top no-body>
        <b-img
            fluid        
            :alt="`${product.name}-${product.id}`"
            :src="imgUrl + product.coverImage"                
        />
        <b-card-body>
            <b-card-text>
             <h6 class="item-name" v-if="product.modelType == 'product'">
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
            <div class="mt-4">
                <b-button class="button-in-bottom" variant="primary" block tag="a"               
                
              >            
                <span> Select</span>
              </b-button>
            </div>
        </b-card>
    <!-- </b-col> -->
</template>

<script>


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
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.my-flex-card > div > div.card {
    height: calc(100% - 50px);
    margin-bottom: 15px;
}
.button-in-bottom{
  position: absolute;
  right:    0;
  bottom:   0;
}
</style>