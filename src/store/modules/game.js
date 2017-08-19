const state = {
  dealer: 0,
  currentPlayer: 1
};

const getters = {
  dealer: state => state.dealer,
  currentPlayer: (state, getters) => {
    return getters.players[state.currentPlayer];
  }
};

const actions = {
  next_player: ({ commit, rootState }, d) => {
    console.log('rootState action', rootState.settings);
    commit('nextPlayer', { d: d, settingsState: rootState['settings'] });
  }
};

const mutations = {
  nextPlayer: (state, { d, settingsState }) => {
    console.log('d', d);
    console.log('settingsState.players', settingsState.players);
    const moveDealer = () => {
      state.dealer = (state.dealer + 1) % settingsState.numberOfPlayers;
    };

    const fold = () => {};

    const knock = () => {};

    const follow = () => {};

    const raise = () => {};

    switch (d) {
      case 'fold':
        fold();
        break;
      case 'knock':
        knock();
        break;
      case 'follow':
        follow();
        break;
      case 'raise':
        raise();
        break;
      default:
        console.log(d);
        break;
    }

    state.currentPlayer =
      (state.currentPlayer + 1) % settingsState.numberOfPlayers;
    console.log('state.currentPlayer', state.currentPlayer);
    let currentPlayer = settingsState.players[state.currentPlayer];
    console.log('currentPlayer', currentPlayer);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
