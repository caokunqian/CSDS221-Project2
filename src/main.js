import MyApp from './App.vue'
import Vue from 'vue'
import vuetify from './plugins/vuetify'
import 'vuetify/dist/vuetify.min.css';
import Toasted from 'vue-toasted';
import '@fortawesome/fontawesome-free/js/all.js'
import '@fortawesome/fontawesome-free/css/all.css'

Vue.config.productionTip = false

const toastedOptions = {
  duration: 1000,
};

Vue.use(Toasted, toastedOptions);

new Vue({
  vuetify,
  render: h => h(MyApp)
}).$mount('#app')
