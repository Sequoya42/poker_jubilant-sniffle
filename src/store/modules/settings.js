const state = {
  stack: 500,
  reset: false,
  numberOfPlayers: 3,
  players: [
    { name: 'Player_1', stack: 0, bet: 0, folded: false, lost: false },
    { name: 'Player_2', stack: 0, bet: 0, folded: false, lost: false },
    { name: 'Player_3', stack: 0, bet: 0, folded: false, lost: false }
  ],
  smallBlind: 10,
  bigBlind: 20
};

const getters = {
  reset: state => state.reset,
  stack: state => state.stack,
  nPlayers: state => state.numberOfPlayers,
  smallBlind: state => state.smallBlind,
  bigBlind: state => state.bigBlind,
  players: state => state.players
};

const actions = {
  update_players: ({ commit }, d) => commit('updatePlayersOrders', d),

  reset_game: ({ commit, dispatch }) => {
    commit('resetGame');
    commit('setPlayersStack');
    return dispatch('new_hand');
  },

  change_name: ({ commit, getters }, d) => {
    let name = d.$event;
    if (getters.players.some(e => e.name === name)) d.$event += '_2';
    commit('changeName', d);
  }
};

const mutations = {
  setStack: (state, d) => (state.stack = d),

  reset: state => (state.reset = !state.reset),

  setSmallBlind: (state, d) => (state.smallBlind = d),

  setBigBlind: (state, d) => (state.bigBlind = d),

  setPlayers: (state, d) => {
    if (d > 0) {
      if (d > state.numberOfPlayers) {
        state.players.splice(d, 1, {
          name: `Player_${+state.numberOfPlayers + 1}`,
          stack: 0,
          bet: 0,
          folded: false,
          lost: false
        });
      } else if (d < state.numberOfPlayers) {
        state.players.splice(d, +(state.numberOfPlayers - d));
      }
      state.numberOfPlayers = d;
    }
  },

  resetGame: (state, d) => {
    state.players = state.players.map((e, i) => ({
      name: `Player_${+i + 1}`,
      stack: state.stack,
      bet: 0,
      folded: false,
      lost: false
    }));
    state.reset = false;
    // let i = 0;
    // let x = [];
    // while (i < state.numberOfPlayers) {
    //   x.push({
    //     name: `Player_${+i + 1}`,
    //     stack: state.stack,
    //     bet: 0,
    //     folded: false,
    //     lost: false
    //   });
    // }
    // state.players = x;
  },

  setPlayersStack: (state, d) => {
    state.players.forEach(e => {
      e.stack = state.stack;
    });
  },

  updatePlayersOrders: (state, d) => {
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
