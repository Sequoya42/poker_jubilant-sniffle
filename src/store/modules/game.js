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
    commit('nextPlayer', { nPlayers: getters.nPlayers });
    commit('skipFolded', { players: getters.players });
    if (state.currentPlayer === getters.playersInHand - 1)
      return dispatch('next_card');
  }
};

const mutations = {
  betAmount: (state, p) => {
    state.betAmount = p;
  },
  skipFolded: (state, { players }) => {
    let isFolded = players[state.currentPlayer].folded;
    while (isFolded) {
      console.log('inWhile', isFolded);
      state.currentPlayer = isFolded
        ? (state.currentPlayer + 1) % state.playersInHand
        : state.currentPlayer;
      isFolded = players[state.currentPlayer].folded;
    }
  },
  nextPlayer: (state, { nPlayers }) => {
    state.currentPlayer = (state.currentPlayer + 1) % nPlayers;
  },
  fold: (state, { player }) => {
    player.folded = true;
    state.playersInHand -= 1;
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
    state.playersInHand = numberOfPlayers;
    console.log('reset', state.playersInHand);
    state.betAmount = smallBlind;
    let pastDealer = players.shift();
    players.push(pastDealer);
    state.dealer = state.dealer === numberOfPlayers - 1 ? 0 : state.dealer + 1;
    console.log('inclearhand');
    console.log(smallBlind);
    console.log(players[(state.dealer + 1) % numberOfPlayers].stack);
    console.log((state.dealer + 1) % numberOfPlayers);
    players[(state.dealer + 1) % numberOfPlayers].stack - smallBlind;
    console.log(players[(state.dealer + 1) % numberOfPlayers].stack);
    players[(state.dealer + 2) % numberOfPlayers].stack - smallBlind * 2;
  },
  playersInHand: (state, { players, numberOfPlayers }) => {
    state.playersInHand = players
      .map(p => p.folded)
      .reduce((a, b) => (a += !b), 0);
    console.log('init', state.playersInHand);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
