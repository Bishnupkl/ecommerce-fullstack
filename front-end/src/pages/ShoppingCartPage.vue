<template>
  <h1>Shopping Cart</h1>
  <div v-if="cartItems.length>0">
    <ShoopingCartList @remove-from-cart="removeFromCart($event)" :products="cartItems"/>
    <button class="checkout-button">Proceed to Checkout</button>
  </div>
  <div v-if="cartItems.length===0"> You currently have no item!</div>
</template>
<script>

// import {cartItems} from "@/temp-data";
import ShoopingCartList from "@/pages/ShoopingCartList.vue";
import axios from "axios";

export default {
  name: "ShoppingCartPage.vue",
  components: {ShoopingCartList},
  props: ['user'],
  data() {
    return {
      cartItems: [],


    }
  },

  watch: {
    async user(newUserValue) {
      if (newUserValue) {

        const cartResponse = await axios.get(`/api/users/${this.user.id}/cart`);
        this.cartItems = cartResponse.data;

      }
    }
  },

  async created() {

    if (this.user) {


      const response = await axios.get(`/api/users/${this.user.uid}/cart`);
      this.cartItems = response.data;
    }
  },
  methods: {
    async removeFromCart(productId) {
      alert(productId);
      const response = await axios.delete(`/api/users/${this.user.uid}/cart/${productId}`);
      this.cartItems = response.data;

    },
  }
}
</script>


<style>

</style>