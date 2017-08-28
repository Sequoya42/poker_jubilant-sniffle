const state = {
  stack: 500,
  numberOfPlayers: 3,
  players: [
    { name: 'Player_1', stack: 500, bet: 0, folded: false },
    { name: 'Player_2', stack: 500, bet: 0, folded: false },
    { name: 'Player_3', stack: 500, bet: 0, folded: false }
  ],
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

const actions = {
  update_players: ({ commit }, d) => commit('updatePlayers', d),

  change_name: ({ commit, getters }, d) => {
    let name = d.$event;
    console.log('name', name);
    console.log(getters.players.some(e => e.name === name));
    if (getters.players.some(e => e.name === name)) d.$event += '_2';
    commit('changeName', d);
  }
};

const mutations = {
  setStack: (state, d) => (state.stack = d),

  setSmallBlind: (state, d) => (state.smallBlind = d),

  setBigBlind: (state, d) => (state.bigBlind = d),

  setPlayers: (state, d) => {
    if (d > 0) {
      if (d > state.numberOfPlayers) {
        state.players.splice(d, 1, {
          name: `Player_${+state.numberOfPlayers + 1}`,
          stack: 500,
          bet: 0,
          folded: false
        });
      } else if (d < state.numberOfPlayers) {
        state.players.splice(d, +(state.numberOfPlayers - d));
      }
      state.numberOfPlayers = d;
    }
  },

  setPlayersStack: (state, d) => {
    state.players.forEach(e => {
      e.stack = state.stack;
    });
  },

  updatePlayers: (state, d) => {
    console.log(d);
    state.players = d;
  },

  changeName: (state, d) => {
    state.players[d.index].name = d.$event;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
