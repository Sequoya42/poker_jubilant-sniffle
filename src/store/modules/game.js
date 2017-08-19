const state = {
  dealer: 0
};

const getters = {
  dealer: state => state.dealer
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
    console.log('settingsState', settingsState);
    console.log('settingsState', settingsState);
    let currentPlayer = settingsState.players[state.dealer];
    console.log(currentPlayer.name, ': ', d);
    // while(currentPlayer.folded = true )
    state.dealer = (state.dealer + 1) % settingsState.numberOfPlayers;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
