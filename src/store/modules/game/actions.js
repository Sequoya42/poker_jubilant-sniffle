module.exports = {
  chooseWinner: ({ dispatch, commit, getters }) => {
    commit('chooseWinner', { players: getters.players });

    let x = getters.players.filter(e => e.stack > getters.smallBlind);
    console.log('x', x.length);
    if (x.length === 1) {
      commit('reset');
    } else {
      return dispatch('new_hand');
    }
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
      smallBlind: getters.smallBlind,
      dealer: getters.nextPlayerPos('dealer')
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
    let nextPos = getters.nextPlayerPos();
    if (state.playersInHand < 2) {
      console.log('BEFORE TIMEOUT');
      setTimeout(() => commit('oneWin', getters.players[nextPos]), 300);
      commit('addWinner', nextPos);
      return dispatch('chooseWinner');
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
    let x = getters.players.map(e => e.stack).filter(e => e > 0);
    if (x.length === 0) {
      return commit('endGame');
    }
    return dispatch('next_player');
  }
};
