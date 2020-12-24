

import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import 'leaflet/dist/leaflet.css';  
import axios from 'axios';
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyALTWP69vAwL158hkj47hXe0w_IwnAIwdQ",
    libraries: "places" // necessary for places input
  },
});


//import "./assets/style/style.scss";


Vue.config.productionTip = false

//Instancia de axios se configura con URL base del backend
const axiosInstance = axios.create({ 
  baseURL: 'http://localhost:8081/'
})

//Para acceder a axios desde this.$http
Vue.prototype.$http = axiosInstance;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')