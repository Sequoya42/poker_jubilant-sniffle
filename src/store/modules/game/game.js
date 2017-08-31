const state = {
  end: false,

  oneWin: false,
  cards: 0,
  playersInHand: 0,
  currentPlayerPos: 1,
  pot: 0,
  separatePot: [],
  lastOne: 0, //last one to talk before next card
  dealer: -1,
  betAmount: 0
};

const getters = {
  separatePot: state => state.separatePot,
  oneWin: state => state.oneWin,
  dealer: state => state.dealer,
  pot: state => state.pot,
  lastOne: state => state.lastOne,
  end: state => state.end,
  betAmount: state => state.betAmount,
  cards: state => state.cards,
  playersInHand: state => state.playersInHand,
  currentPlayerPos: state => state.currentPlayerPos,
  currentPlayer: (state, getters) => {
    return getters.players[state.currentPlayerPos];
  },
  nextPlayerPos: (state, getters) => {
    let players = getters.players;
    let pos = (state.currentPlayerPos + 1) % getters.nPlayers;
    console.log('players', players);
    while (players[pos].lost || getters.players[pos].folded) {
      pos = (pos + 1) % getters.nPlayers;
    }
    return pos;
  },
  nextPlayer: (state, getters) => {
    return getters.players[getters.nextPlayerPos];
  },

  minStack: (state, getters) =>
    getters.players.map(e => e.stack).reduce((a, b) => (a < b ? a : b))
};

const actions = require('./actions');
const mutations = require('./mutations');

export default {
  state,
  getters,
  actions,
  mutations
};
