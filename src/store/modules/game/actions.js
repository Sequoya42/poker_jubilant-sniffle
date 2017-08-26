module.exports = {
  playersInHand: ({ commit, getters }) => {
    commit('playersInHand', { players: getters.players });
  },

  bet_amount: ({ commit }, p) => {
    commit('betAmount', p);
  },

  next_card: ({ commit, getters }, p) => {
    if (getters.cards === 5) {
      commit('clearHand', {
        p,
        players: getters.players,
        numberOfPlayers: getters.nPlayers,
        smallBlind: getters.smallBlind
      });
    } else {
      commit('nextCard', {
        cards: getters.cards === 0 ? 3 : 1,
        betAmount: getters.smallBlind
      });
    }
  },

  next_player: ({ dispatch, commit, state, getters }, p) => {
    let player = getters.currentPlayer;
    let players = getters.players;
    if (p.type === 'fold') commit('fold', { player });
    else if (p.type === 'follow') commit('follow', { player });
    else if (p.type === 'raise') commit('raise', { player });
    else if (p.type === 'allIn') commit('allIn', { player });
    commit('nextPlayer', { nPlayers: getters.playersInHand });
    commit('skipFolded', {
      players: getters.players,
      nPlayers: getters.nPlayers
    });
    // if (getters.playersInHand < 2)
    // commit('endGame')
    if (players[state.currentPlayerPos] === players[state.playersInHand - 1]) {
      return dispatch('next_card');
    }
  }
};
