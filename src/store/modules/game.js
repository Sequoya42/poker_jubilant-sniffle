const state = {
  cards: 0,
  dealer: 0,
  playersInHand: 0,
  currentPlayer: 1,
  pot: 0,
  betAmount: 10
};

const getters = {
  dealer: state => state.dealer,
  betAmount: state => state.betAmount,
  cards: state => state.cards,
  playersInHand: state => state.playersInHand,
  currentPlayerPosition: state => state.currentPlayer,
  currentPlayer: (state, getters) => {
    return getters.players[state.currentPlayer];
  }
};

// p for payload
const actions = {
  playersInHand: ({ commit, getters }) => {
    commit('playersInHand', { players: getters.players });
  },
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
  next_player: ({ state, dispatch, commit, rootState, getters }, p) => {
    switch (p.type) {
      case 'fold':
        commit('fold', { p, player: getters.currentPlayer });
        // commit('playersInHand', { players: getters.players });
        break;
      case 'follow':
        commit('follow', { p, player: getters.currentPlayer });
        break;
      case 'raise':
        commit('raise', { p, player: getters.currentPlayer });
        break;
      case 'allIn':
        commit('allIn', { p, player: getters.currentPlayer });
        break;
      default:
        break;
    }
    commit('nextPlayer', { p, settings: rootState['settings'] });
    if (state.currentPlayer === getters.playersInHand - 1)
      return dispatch('next_card');
  }
};

const mutations = {
  betAmount: (state, p) => {
    state.betAmount = p;
  },
  //find a way to access players[index].folded
  nextPlayer: (state, { p, settings }) => {
    console.log('state.currentPlayer.folded', state.currentPlayer);
    state.currentPlayer = (state.currentPlayer + 1) % settings.numberOfPlayers;
  },
  fold: (state, { player }) => {
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
  allIn: (state, { player }) => {
    state.pot += player.stack;
    player.stack = 0;
  },
  // ******** ********  next_card stuff  ******** ********
  flop: (state, { player, smallBlind }) => {
    state.cards = 3;
    state.betAmount = smallBlind;
  },
  turnRiver: (state, { player, smallBlind }) => {
    state.cards += 1;
    state.betAmount = smallBlind;
  },
  clearHand: (state, { players, numberOfPlayers, smallBlind }) => {
    players.forEach(e => (e.folded = false));
    state.cards = 0;
    state.betAmount = smallBlind;
    let pastDealer = players.shift();
    players.push(pastDealer);
    state.dealer = state.dealer === numberOfPlayers - 1 ? 0 : state.dealer + 1;
  },
  playersInHand: (state, { players, numberOfPlayers }) => {
    state.playersInHand = players
      .map(p => p.folded)
      .reduce((a, b) => (a += !b), 0);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
