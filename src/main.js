// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import VueMaterial from 'vue-material';
import Vuetify from 'vuetify';
import App from './App';
import popup from './components/popup';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

require('../node_modules//vuetify/dist/vuetify.min.css');

Vue.use(Vuex);
Vue.use(Vuetify);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App, popup }
});
