const state = {
  stack: null,
  numberOfPlayers: null,
  players: [],
  smallBlind: null,
  bigBlind: null
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
  setPlayers: (state, d) => {
    if (d > 1) {
      state.numberOfPlayers = d;
      state.players = [];
      //set up rules, when changing that number, to keep names of players etc
      for (let i = 0; i < d; i++) state.players.push(`Player_${i + 1}`);
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
