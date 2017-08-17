const state = {
  stack: 500,
  numberOfPlayers: 2,
  players: ['Player_1', 'Player_2'],
  smallBlind: 10,
  bigBlind: 20
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
  setPlayers: (state, d) => {
    //set up rules, when changing that number, to keep names of players etc
    if (d > 0) {
      if (d > state.numberOfPlayers) {
        for (let i = state.numberOfPlayers; i < d; i++)
          state.players.push(`Player_${+i + 1}`);
      } else if (d < state.numberOfPlayers) {
        state.players.splice(d, +(state.numberOfPlayers - d));
      }
      state.numberOfPlayers = d;
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
