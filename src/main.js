import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './scss/styles.scss'
import { createPinia } from 'pinia';
import VueTheMask from 'vue-the-mask'
import Permissions from '@Helpers/permissions.js'
import 'element-plus/dist/index.css'
// import the package
import VueAwesomePaginate from "vue-awesome-paginate";

// import the necessary css file
import "vue-awesome-paginate/dist/style.css";



const pinia = createPinia();
const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(VueTheMask)
app.use(VueAwesomePaginate)
app.use(Permissions);
app.mount('#app')
