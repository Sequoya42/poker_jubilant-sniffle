const state = {
  dealer: 0,
  currentPlayer: 1,
  pot: 0,
  betAmount: 10
};

const getters = {
  dealer: state => state.dealer,
  betAmount: state => state.betAmount,
  currentPlayer: (state, getters) => {
    return getters.players[state.currentPlayer];
  }
};

// p for payload
const actions = {
  bet_amount: ({ commit }, p) => {
    commit('betAmount', p);
  },
  next_player: ({ commit, rootState, getters }, p) => {
    console.log('rootState action', rootState.settings);
    switch (p.type) {
      case 'fold':
        commit('fold', { p, player: getters.currentPlayer });
        break;
      case 'follow':
        commit('follow', { p, player: getters.currentPlayer });
        break;
      case 'raise':
        commit('raise', { p, player: getters.currentPlayer });
        break;
      default:
        console.log('Should be "knock" : ', p);
        break;
    }
    commit('nextPlayer', { settings: rootState['settings'] });
  }
};

const mutations = {
  betAmount: (state, p) => {
    state.betAmount = p;
  },
  nextPlayer: (state, { settings }) => {
    state.currentPlayer = (state.currentPlayer + 1) % settings.numberOfPlayers;
    // state.betAmount = 0;
  },
  fold: (state, { player }) => {
    console.log('state.currentPlayer', player);
    player.folded = true;
  },
  follow: (state, { player }) => {
    state.pot += state.betAmount;
    player.stack -= state.betAmount;
  },
  raise: (state, { player }) => {
    state.pot += state.betAmount;
    player.stack -= state.betAmount;
  }
};

// console.log('d', d);
// console.log('settings.players', settings.players);
// const moveDealer = () => {
//   state.dealer = (state.dealer + 1) % settings.numberOfPlayers;
// };
export default {
  state,
  getters,
  actions,
  mutations
};
