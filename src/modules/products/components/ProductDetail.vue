<template>
     <b-modal :id="product.uuid" ok-only :title="product.name" size="lg">
        <b-card-text              
              
          >
              <div v-html="product.description"></div>              
          </b-card-text>
    </b-modal>
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
