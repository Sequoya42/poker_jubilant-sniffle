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
// import ScrollBar from './directives/scrollBar.js';

Vue.config.productionTip = false;

require('../node_modules//vuetify/dist/vuetify.min.css');
// require('../node_modules/vue-material/dist/vue-material.css');
// Vue.use(VueMaterial);

Vue.use(Vuex);
Vue.use(Vuetify);
// Vue.directive('scrollBar', {
//   // bind: function(el) {
//   //   console.log('');
//   //   this.$el.scrollTop = this.el.scrollHeight;
//   // },
//
//   update: function(newValue, oldValue) {
//     this.el.scrollTop = this.el.scrollHeight;
//   }
// });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App, popup }
});
