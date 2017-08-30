module.exports = {
  chooseWinner: ({ dispatch, commit, getters }, winners) => {
    if (!winners.length) return;

    commit('chooseWinner', { winners, players: getters.players });
    return dispatch('new_hand');
  },

  update_amount: ({ commit, getters }, amount) => {
    console.log('amount', amount);
    commit('updateAmount', {
      amount: amount,
      numberOfPlayers: getters.nPlayers
    });
  },

  new_hand: ({ commit, getters }, first) => {
    commit('newHand', {
      players: getters.players,
      numberOfPlayers: getters.nPlayers,
      smallBlind: getters.smallBlind
    });
  },

  next_card: ({ commit, state, getters }) => {
    if (state.cards === 5) {
      commit('endGame');
    } else {
      commit('nextCard', {
        cards: state.cards === 0 ? 3 : 1,
        players: getters.players,
        smallBlind: getters.bigBlind,
        nPlayers: getters.nPlayers
      });
      commit('updateAmount', {
        amount: getters.bigBlind,
        nPlayers: getters.nPlayers
      });
    }
  },

  next_player: ({ dispatch, commit, state, getters }, p) => {
    if (state.playersInHand < 2) {
      return dispatch('chooseWinner', [getters.nextPlayerPos]);
    }
    if (state.currentPlayerPos === state.lastOne) {
      dispatch('next_card');
    }
    commit('nextPlayer', {
      nPlayers: getters.nPlayers,
      players: getters.players
    });
  },

  next_action: ({ dispatch, commit, state, getters }, p) => {
    const player = getters.currentPlayer,
      pos = getters.currentPlayerPos,
      nPlayers = getters.nPlayers,
      amount = p.amount;

    // if (player.stack > 0) {
    if (p.type === 'fold') commit('fold', { player, pos, nPlayers });
    else if (p.type === 'bet') commit('bet', { player, pos, amount });
    // }

    return dispatch('next_player');
  }
};
