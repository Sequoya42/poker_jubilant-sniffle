const state = {
  end: false,
  allEven: true,
  cards: 0,
  playersInHand: 0,
  currentPlayerPos: 1,
  pot: 0,
  lastOne: 0, //last one to talk before next card
  betAmount: 0
};

const getters = {
  allEven: state => state.allEven,
  pot: state => state.pot,
  lastOne: state => state.lastOne,
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

export default {
  state,
  getters,
  actions,
  mutations
};
