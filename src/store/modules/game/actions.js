module.exports = {
  playersInHand: ({ commit, getters }) => {
    commit('playersInHand', { players: getters.players });
  },
  bet_amount: ({ commit }, p) => {
    commit('betAmount', p);
  },
  next_card: ({ commit, getters }, p) => {
    console.log('getters.cards', getters.cards);
    if (getters.cards === 0) {
      return commit('flop', {
        p,
        player: getters.currentPlayer,
        smallBlind: getters.smallBlind
      });
    } else if (getters.cards === 5) {
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
    if (getters.currentPlayerPos === getters.playersInHand - 1)
      return dispatch('next_card');
  }
};
