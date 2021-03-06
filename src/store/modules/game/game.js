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
  // ******** ********  next player  ******** ********
  nextPlayerPos: (state, getters) => (from = 'player', count = 1) => {
    from = from === 'player' ? state.currentPlayerPos : from;
    let pos = from % getters.nPlayers;
    while (count) {
      let i = 0;
      pos = (pos + 1) % getters.nPlayers;
      while (
        (getters.players[pos].lost ||
          getters.players[pos].folded ||
          getters.players[pos].allIn) &&
        i++ < 50
      ) {
        pos = (pos + 1) % getters.nPlayers;
      }
      if (i == 51) {
        pos = getters.players.findIndex(e => e.allIn);
      }
      count--;
    }
    return pos;
  },
  // ******** ********  Prev player  ******** ********
  prevPlayerPos: (state, getters) => (from = 'player', count = 1) => {
    from = from === 'player' ? state.currentPlayerPos : from;
    let pos = from === 0 ? getters.nPlayers - 1 : from - 1;
    while (count) {
      let i = 0;
      while (
        i++ < 50 &&
        (getters.players[pos].lost ||
          getters.players[pos].folded ||
          getters.players[pos].allIn)
      ) {
        pos = pos === 0 ? getters.nPlayers - 1 : pos - 1;
      }
      count--;
    }
    return pos;
  },
  // ******** ********  change last one to play  ******** ********
  changeLast: (state, getters) => type => {
    return (
      type == 'bet' ||
      (type == 'allIn' &&
        getters.players.filter(p => p.bet >= getters.currentPlayer.bet).length ==
        1)
    );
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