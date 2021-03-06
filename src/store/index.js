import Vue from 'vue';
import Vuex from 'vuex';
import game from './modules/game/game.js';
import settings from './modules/settings';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  strict: true,
  state: {},
  modules: {
    game,
    settings
  }
});
