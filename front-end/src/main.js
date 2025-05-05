import {createApp} from 'vue'
import App from './App.vue'
import './main.css';
import * as VueRouter from 'vue-router';
import ShoppingCartPage from "@/pages/ShoppingCartPage.vue";
import Productspage from "@/pages/Productspage.vue";
import ProductDetailPage from "@/pages/ProductDetailPage.vue";
import NotFound from "@/pages/NotFound.vue";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyADPpNn9MFdp8dGt8MBqGahyAOaWAitbQo",
    authDomain: "vue-site-f6298.firebaseapp.com",
    projectId: "vue-site-f6298",
    storageBucket: "vue-site-f6298.firebasestorage.app",
    messagingSenderId: "831830720457",
    appId: "1:831830720457:web:c5d46d25566ce3c90bf218"
};

// Initialize Firebase
initializeApp(firebaseConfig);

createApp(App)
    .use(VueRouter.createRouter({
        history: VueRouter.createWebHistory(process.env.BASE_URL),
        routes: [
            {
                path: '/cart',
                component: ShoppingCartPage,
            }, {
                path: '/products',
                component: Productspage,
            }, {
                path: '/products/:productId',
                component: ProductDetailPage,
            },
            {
                path: '/',
                redirect: '/products',

            },
            {
                path: '/:pathMatch(.*)*',
                component: NotFound,

            }
        ]
    }))
    .mount('#app')
