const state = {
  cards: 0,
  dealer: 0,
  currentPlayer: 1,
  pot: 0,
  betAmount: 10
};

const getters = {
  dealer: state => state.dealer,
  betAmount: state => state.betAmount,
  cards: state => state.cards,
  currentPlayer: (state, getters) => {
    return getters.players[state.currentPlayer];
  }
};

// p for payload
const actions = {
  bet_amount: ({ commit }, p) => {
    commit('betAmount', p);
  },
  next_card: ({ commit, getters }, p) => {
    if (state.cards === 0) {
      return commit('flop', {
        p,
        player: getters.currentPlayer,
        smallBlind: getters.smallBlind
      });
    } else if (state.cards === 5) {
      commit('clearHand', {
        p,
        players: getters.players,
        numberOfPlayers: getters.nPlayers,
        smallBlind: getters.smallBlind
      });
    } else {
      commit('turnRiver', {
        p,
        player: getters.currentPlayer,
        smallBlind: getters.smallBlind
      });
    }
  },
  next_player: ({ dispatch, commit, rootState, getters }, p) => {
    console.log('NEXT PLAYER', p);
    switch (p.type) {
      case 'fold':
        commit('fold', { p, player: getters.currentPlayer });
        break;
      case 'follow':
        commit('follow', { p, player: getters.currentPlayer });
        break;
      case 'raise':
        commit('raise', { p, player: getters.currentPlayer });
        break;
      default:
        console.log('Should be "knock" : ', p);
        break;
    }
    commit('nextPlayer', { p, settings: rootState['settings'] });
    return dispatch('next_card');
  }
};

const mutations = {
  betAmount: (state, p) => {
    state.betAmount = p;
  },
  nextPlayer: (state, { p, settings }) => {
    state.currentPlayer = (state.currentPlayer + 1) % settings.numberOfPlayers;
    console.log('p', p);
    state.betAmount = settings.smallBlind;
    if (state.currentPlayer === state.dealer)
      state.betAmount = settings.smallBlind;
  },
  fold: (state, { player }) => {
    console.log('state.currentPlayer', player);
    player.folded = true;
  },
  follow: (state, { player }) => {
    state.pot += state.betAmount;
    player.stack -= state.betAmount;
  },
  raise: (state, { player }) => {
    state.pot += state.betAmount;
    player.stack -= state.betAmount;
  },
  // ******** ********  Hand stuff  ******** ********
  flop: (state, { player, smallBlind }) => {
    state.cards = 3;
    state.betAmount = smallBlind;
  },
  turnRiver: (state, { player, smallBlind }) => {
    state.cards += 1;
    state.betAmount = smallBlind;
  },
  clearHand: (state, { players, numberOfPlayers, smallBlind }) => {
    state.cards = 0;
    state.betAmount = smallBlind;
    let pastDealer = players.shift();
    players.push(pastDealer);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
