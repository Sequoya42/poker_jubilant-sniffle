//put stack inside players? when? how?
//dealer as state.dealer with index of players ?

//TODO
/*
Figure out what to do
Refactor [separate setttings from game, this is mostly settings]
Find a way to architecture the game loop
[each user action, and the end of a "hand" [reset folded attributes etc]]
*/
const state = {
  dealer: 0,
  stack: 500,
  numberOfPlayers: 2,
  players: [{ name: 'Player_1', stack: 500 }, { name: 'Player_2', stack: 500 }],
  smallBlind: 10,
  bigBlind: 20
};

const getters = {
  stack: state => state.stack,
  nPlayers: state => state.numberOfPlayers,
  smallBlind: state => state.smallBlind,
  bigBlind: state => state.bigBlind,
  players: state => state.players,
  dealer: state => state.dealer
};

const actions = {
  update_players: ({ commit }, d) => {
    commit('updatePlayers', d);
  },
  change_name: ({ commit }, d) => {
    console.log('IN action', d);
    commit('changeName', d);
  },
  next_player: ({ commit }, d) => {
    commit('nextPlayer', d);
  }
};

const mutations = {
  //called directly in settings.vue
  setStack: (state, d) => (state.stack = d),
  setSmallBlind: (state, d) => (state.smallBlind = d),
  setBigBlind: (state, d) => (state.bigBlind = d),
  setPlayers: (state, d) => {
    //set up rules, when changing that number, to keep names of players etc
    if (d > 0) {
      if (d > state.numberOfPlayers) {
        for (let i = state.numberOfPlayers; i < d; i++)
          state.players.push({ name: `Player_${+i + 1}` });
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
  //triggered by actions in game.vue
  updatePlayers: (state, d) => {
    console.log(d);
    state.players = d;
  },
  changeName: (state, d) => {
    console.log('new', d.$event);
    state.players[d.index].name = d.$event;
    console.log('Player:', state.players);
    console.log(d);
  },
  nextPlayer: (state, d) => {
    console.log(d);
    let currentPlayer = state.players[state.dealer];
    console.log(currentPlayer.name);
    // while(currentPlayer.folded = true )
    state.dealer = (state.dealer + 1) % state.numberOfPlayers;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
