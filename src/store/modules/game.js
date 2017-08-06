const state = {
  stack: 0,
  numberOfPlayers: 0,
  players: [],
  smallBlind: 0,
  bigBlind: 0
};

const getters = {
  stack: state => state.stack,
  nPlayers: state => state.numberOfPlayers,
  smallBlind: state => state.smallBlind,
  bigBlind: state => state.bigBlind,
  players: state => state.players
};
const actions = {};
const mutations = {
  setStack: (state, d) => (state.stack = d),
  setSmallBlind: (state, d) => (state.smallBlind = d),
  setBigBlind: (state, d) => (state.bigBlind = d),
  setPlayers: (state, d) => (state.players = d),
  // setNPlayers: (state, d) => (state.numberOfPlayers = d),
  setMockPlayers: (state, d) => {
    state.numberOfPlayers = d;
    for (let i = 0; i < d; i++) state.players.push(`Player_${i + 1}`);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
