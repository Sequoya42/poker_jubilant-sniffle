const state = {
  end: false,
  cards: 0,
  playersInHand: 0,
  currentPlayerPos: 1,
  pot: 0,
  lastOne: 0, //last one to talk before next card
  betAmount: 0,
  playerBets: []
};

const getters = {
  pot: state => state.pot,
  end: state => state.end,
  betAmount: state => state.betAmount,
  cards: state => state.cards,
  playersInHand: state => state.playersInHand,
  currentPlayerPos: state => state.currentPlayerPos,
  currentPlayer: (state, getters) => {
    return getters.players[state.currentPlayerPos];
  }
};

const actions = require('./actions');
const mutations = require('./mutations');

console.log('actions', actions);
export default {
  state,
  getters,
  actions,
  mutations
};
