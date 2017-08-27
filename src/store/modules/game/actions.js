module.exports = {
  chooseWinner: ({ dispatch, commit, getters }, winners) => {
    commit('chooseWinner', { winners, players: getters.players });
    return dispatch('new_hand');
  },

  bet_amount: ({ commit }, p) => commit('betAmount', p),

  new_hand: ({ commit, getters }, first) => {
    commit('newHand', {
      first,
      players: getters.players,
      numberOfPlayers: getters.nPlayers,
      smallBlind: getters.smallBlind
    });
  },

  next_card: ({ commit, state, getters }) => {
    if (state.cards === 5) {
      commit('endGame');
    }
    commit('nextCard', {
      cards: state.cards === 0 ? 3 : 1,
      amount: state.betAmount
    });
  },

  next_player: ({ dispatch, commit, state, getters }, p) => {
    commit('nextPlayer', {
      nPlayers: getters.nPlayers,
      players: getters.players
    });

    if (state.currentPlayerPos === state.lastOne) {
      return dispatch('next_card');
    }
  },

  next_action: ({ dispatch, commit, state, getters }, p) => {
    const player = getters.currentPlayer,
      pos = getters.currentPlayerPos,
      nPlayers = getters.nPlayers,
      amount = p.type === 'knock' ? 0 : state.betAmount;

    if (p.type === 'fold') commit('fold', { player, pos, nPlayers });
    else commit('bet', { player, pos, amount });

    return dispatch('next_player');
  }
};
