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
  // dealer: 0,
  // // stack: 500,
  // numberOfPlayers: 2,
  players: [{ name: 'Player_10', stack: 500 }, { name: 'Player_22', stack: 500 }]
  // // smallBlind: 10,
  // // bigBlind: 20
};

const getters = {
  // dealer: state => state.dealer
};

const actions = {
  next_player: ({ commit }, d) => {
    commit('nextPlayer', d);
  }
};

const mutations = {
  nextPlayer: (state, d) => {
    let currentPlayer = state.players[state.dealer];
    console.log(currentPlayer.name, ': ', d);
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
