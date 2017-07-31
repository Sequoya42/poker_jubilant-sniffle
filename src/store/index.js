import Vue from 'vue';
import Vuex from 'vuex';
import game from './modules/game';
// import * as actions from './actions';
// import * as getters from './getters';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  // actions,
  // getters,
  modules: {
    game
  }
  // strict: debug,
  // plugins: debug ? [createLogger()] : []
});
