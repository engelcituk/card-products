<template>
    <div class="modal-overlay-product" @click="$emit('close-modal')">
        <div class="modal-body">        
            <b>{{product.name}}</b> 
            <div v-html="product.description" class="description"></div>              
        </div>
        <div class="close-modal" @click="$emit('close-modal')">
            <font-awesome-icon icon="close" />
        </div>
    </div>
</template>

<script>
    export default {
        props:{            
            product : {
                type: Object,
                required: true
            }
        },
        methods: {
           
        }
    }
</script>

<style scoped>
.modal-overlay-product {
    z-index:2;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    background-color: #332d2dda;
}

.modal-body {
  /* text-align: justify; */
  background-color: white;
  
  overflow-y: auto;
  max-height: 650px;
  width: 700px;
  margin-top: 5%;
  padding: 2rem;
  border-radius: 3px;
}
.description{
    margin-block-start: 1rem;
}
.close-modal {
  margin: 5% 0 0 10px;
  cursor: pointer;
  color: white;
  font-size: 1.5rem;
}
</style>