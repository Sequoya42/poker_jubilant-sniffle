import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import App from './App';
import popup from './components/popup';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

require('../node_modules//vuetify/dist/vuetify.min.css');

Vue.use(Vuex);
Vue.use(Vuetify, {
  theme: {
    primary: '#232b2b',
    secondary: '#33673B'
  }
});

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});