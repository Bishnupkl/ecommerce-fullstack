<template>
  <h1>Product Page</h1>

<ProductsList :products="products" ></ProductsList>


</template>

<script>

// import {products} from "@/temp-data";
import ProductsList from "@/pages/ProductsList.vue";
import axios from "axios";

export default {
  name: "ProductsPage",
  components: {ProductsList},
  data() {
    return {
      products:[],

    }

  },

  async created() {
    const response = await axios.get('/api/products');
    this.products = response.data;
  },
}
</script>



<style scoped>

</style>