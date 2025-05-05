<script>
export default {
  name: "ShoopingCartList",
  props: ['products'],

}
</script>

<template>
  <div class="product-container" v-for="product in products" :key="product.id">
    <img class="product-image" :src="product.imageName" alt="prdduct">
    <div class="details-wrap">
      <h3>{{ product.name }}</h3>
      <p>{{ product.price }}</p>
    </div>
    <button @click="$emit('remove-from-cart', product.id)" class="remove-button">Remove from Cart</button>  </div>
</template>

<style scoped>

</style>