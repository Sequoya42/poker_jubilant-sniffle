const state = {
  cards: 0,
  dealer: 0,
  playersInHand: 0,
  currentPlayerPos: 1,
  pot: 0,
  betAmount: 10
};

const getters = {
  dealer: state => state.dealer,
  betAmount: state => state.betAmount,
  cards: state => state.cards,
  playersInHand: state => state.playersInHand,
  currentPlayerPos: state => state.currentPlayerPos,
  currentPlayer: (state, getters) => {
    return getters.players[state.currentPlayerPos];
  }
};

// p for payload
// p for payload
const actions = require('./actions');
const mutations = require('./mutations');

console.log('actions', actions);
export default {
  state,
  getters,
  actions,
  mutations
};
