module.exports = {
  reset: ({ commit, getters }, winners) =>
    commit('reset', { winners, players: getters.players }),

  bet_amount: ({ commit }, p) => commit('betAmount', p),

  new_hand: ({ commit, getters, state }, first) => {
    commit('newHand', {
      first,
      players: getters.players,
      numberOfPlayers: getters.nPlayers,
      smallBlind: getters.smallBlind
    });
  },

  next_card: ({ commit, state, getters }) => {
    if (state.cards === 5) {
      commit('newHand', {
        players: getters.players,
        numberOfPlayers: getters.nPlayers,
        smallBlind: getters.smallBlind
      });
    } else {
      commit('nextCard', {
        cards: state.cards === 0 ? 3 : 1,
        amount: state.betAmount
      });
    }
  },

  next_player: ({ dispatch, commit, state, getters }, p) => {
    commit('nextPlayer', { nPlayers: getters.playersInHand });

    if (+state.currentPlayerPos === +state.lastOne) {
      return dispatch('next_card');
    }
  },

  next_action: ({ dispatch, commit, state, getters }, p) => {
    const player = getters.currentPlayer;
    if (p.type === 'fold') commit('fold', { player });
    else
      commit('bet', {
        player,
        pos: state.currentPlayerPos,
        amount: p.type === 'knock' ? 0 : state.betAmount
      });

    return dispatch('next_player');
    // commit('skipFolded', {
    //   players: getters.players,
    //   nPlayers: getters.nPlayers
    // });
    // if (getters.playersInHand < 2)
    // commit('endGame')
  }
};
