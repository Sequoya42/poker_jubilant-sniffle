const state = {
  end: false,
  listActions: [],
  oneWin: false,
  cards: 0,
  playersInHand: 0,
  currentPlayerPos: 1,
  pot: 0,
  separatePot: [],
  winners: [],
  lastOne: 0, //last one to talk before next card
  dealer: -1,
  betAmount: 0
};

const getters = {
  separatePot: state => state.separatePot,
  listActions: state => state.listActions,
  winners: state => state.winners,
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
  nextPlayerPos: (state, getters) => (from = 'player') => {
    from = from === 'player' ? state.currentPlayerPos : from;
    let pos = (from + 1) % getters.nPlayers;
    console.log('pos', pos);
    while (getters.players[pos].lost || getters.players[pos].folded) {
      pos = (pos + 1) % getters.nPlayers;
    }
    console.log('Next pos', pos);
    return pos;
  },

  prevPlayerPos: (state, getters) => (from = 'player') => {
    from = from === 'player' ? state.currentPlayerPos : from;
    let pos = from === 0 ? getters.nPlayers - 1 : from - 1;
    while (getters.players[pos].lost || getters.players[pos].folded) {
      pos = pos === 0 ? getters.nPlayers : pos - 1;
    }
    return pos;
  },

  nextPlayer: (state, getters) => {
    return getters.players[getters.nextPlayerPos('player')];
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

/*
//TODO


Alin failed [chip lead] when one is finished
when one is done, order player is fucked up [lastOne]

Redo last one completely, and dealer
*/
