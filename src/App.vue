<template>
  <b-container>
    <Products :tokenApp="tokenApp" v-if="tokenApp!=''"/>  
    <b-alert v-model="showDismissibleAlert" variant="danger" v-else class="mt-5">
      Productos no disponibles
    </b-alert>
  </b-container>
</template>

<script>

import Products from '@/modules/products/views/Products'

export default {
  name: 'App',
  components: {
    Products
  },
  props:{
    tokenApp:{
      type: String,
      default: '6f292a4810d10da360ab264cf6e6d36b7b4f8ded'
    }
  },
  data(){
    return {
      showDismissibleAlert: true
    }
  }
}
</script>
