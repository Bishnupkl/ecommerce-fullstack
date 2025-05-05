<script>
import {products} from '../temp-data';
export default {
  name: "ProductsPage",
  data(){
    return {
      products,

    }
  }
}
</script>

<template>

  <h1>Products</h1>

  <div class="grid-wrap">
    <div v-for="(product,index) in products" :key="index">
      <img :src="product.imageName" alt="Image">
      <h3 class="product-name">
        {{product.name}}
      </h3>
      <p class="product-price">{{product.price}}</p>
      <button>View Details</button>
    </div>
  </div>
</template>

<style scoped>

</style>