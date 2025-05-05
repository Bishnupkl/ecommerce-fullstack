<script>

// import {products} from "@/temp-data";
import NotFound from "@/pages/NotFound.vue";
import axios from "axios";
import {
  getAuth,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  // SignInWithEmailLink
} from 'firebase/auth';

export default {
  name: "ProductDetailPage.vue",
  components: {NotFound},
  props: ['user'],
  data() {
    return {
      product: {},
      cartItems: [],


    }
  },

  async created() {

    const auth = getAuth();
    if (isSignInWithEmailLink(auth, window.location.href)) {
      const email = window.localStorage.getItem('emailForSignIn');
      await isSignInWithEmailLink(auth, email, window.location.href);
      alert('Successfully sign in !');
      window.localStorage.removeItem('emailForSignIn');
    }

    const response = await axios.get(`/api/products/${this.$route.params.productId}`);
    this.product = response.data;

    if (this.user) {
      const cartResponse = await axios.get(`/api/users/${this.user.id}/cart`);
      this.cartItems = cartResponse.data;
    }
  },

  computed: {
    itemIsInCart() {
      return this.cartItems.some(item => item.id === this.$route.params.productId);
    },
  },

  watch: {
    async user(newUserValue) {
      if (newUserValue) {

        const cartResponse = await axios.get(`/api/users/${this.user.id}/cart`);
        this.cartItems = cartResponse.data;

      }
      }
    },
    methods: {
      async addToCart() {

        await axios.post(`/api/users/${this.user.uid}/cart`, {
          id: this.$route.params.productId,

        });
        alert('added to cart');


      },

      async signIn() {
        const email = prompt('Please enter your email to sign in');
        const auth = getAuth();
        const actionCodeSettings = {
          url: `http://localhost:8080/products/${this.$route.params.productId}`,
          handleCodeInApp: true,
        }

        await sendSignInLinkToEmail(auth, email, actionCodeSettings);
        alert('A login link was sent to the email you provided');
        window.localStorage.setItem('emailForSignIn', email);
      },
    }

  };
</script>

<template>
  <div v-if="product">
    <div class="img-wrap">
      <img :src="product.imageName" alt="img">

    </div>
    <div class="product-details">
      <h1>{{ product.name }}</h1>
      <h3 class="price">{{ product.price }}</h3>
      <button @click="addToCart" class="add-to-cart" v-if="user && !itemIsInCart">Add To Cart</button>
      <button class="grey-button" v-if="user && itemIsInCart">Item is already in Cart</button>
      <button class="sign-in" v-if="!user" @click="signIn">Sign in first to add to Cart</button>
    </div>
  </div>
  <div v-else>
    <NotFound/>
  </div>

</template>

<style scoped>

</style>