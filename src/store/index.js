import Vue from 'vue';
import Vuex from 'vuex';
import game from './modules/game/game.js';
import settings from './modules/settings';
import playerSettings from './modules/playerSettings';
// import * as actions from './actions';
// import * as getters from './getters';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  strict: true,
  state: {
    players: []
  },
  // actions,
  // getters,
  modules: {
    game,
    settings,
    playerSettings
  }
  // strict: debug,
  // plugins: debug ? [createLogger()] : []
});
