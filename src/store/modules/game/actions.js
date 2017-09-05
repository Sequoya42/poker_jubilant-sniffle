module.exports = {
  chooseWinner: ({ state, dispatch, commit, getters }) => {
    commit('chooseWinner', { players: getters.players });

    let x = getters.players.filter(e => e.stack > getters.smallBlind);
    console.log('x', x.length);
    if (x.length === 1) {
      commit('reset');
    } else if (state.separatePot.every((el, i, arr) => el === 0)) {
      return dispatch('new_hand');
    }
  },

  getMoneyBack: ({ commit, getters, dispatch }) => {
    commit('getMoneyBack', getters.players);
    return dispatch('new_hand');
  },

  update_amount: ({ state, commit, getters }, amount) => {
    commit('updateAmount', {
      amount: amount,
      numberOfPlayers: getters.nPlayers,
      bet: getters.currentPlayer.bet
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
        lastOne: getters.prevPlayerPos(state.dealer + 1)
      });
      commit('updateAmount', {
        amount: getters.bigBlind,
        nPlayers: getters.nPlayers
      });
    }
  },

  next_player: ({ dispatch, commit, state, getters }, p) => {
    let nextPos = getters.nextPlayerPos();
    if (!getters.players.filter(e => !e.folded && e.stack).length) {
      console.log('if end game');
      return commit('endGame');
    } else if (state.playersInHand < 2) {
      console.log('BEFORE TIMEOUT');
      setTimeout(() => commit('oneWin', getters.players[nextPos]), 300);
      commit('addWinner', nextPos);
      return dispatch('chooseWinner');
    } else if (state.currentPlayerPos === state.lastOne) {
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
      lastOne = getters.nextPlayerPos(pos),
      amount = p.amount;

    if (amount && state.separatePot.every((a, i, arr) => a === arr[0])) {
      console.log('NOW');
      console.log('amount', amount);
      console.log('state.currentPlayerPos', state.currentPlayerPos);
      console.log('lastOne', pos);

      commit('updateLast', getters.prevPlayerPos());
    }
    if (p.type === 'fold') commit('fold', { player, pos, lastOne });
    else if (p.type === 'bet') commit('bet', { player, pos, amount });
    // }
    let x = getters.players.map(e => e.stack).filter(e => e > 0);
    if (x.length === 0) {
      return commit('endGame');
    }
    if (!getters.players.filter(e => !e.folded || e.stack === 0).length) {
      console.log('if end game');
      return commit('endGame');
    }
    return dispatch('next_player');
  },

  new_hand: ({ commit, getters }, first) => {
    commit('newHand', {
      players: getters.players,
      numberOfPlayers: getters.nPlayers,
      smallBlind: getters.smallBlind,
      dealer: getters.nextPlayerPos(+getters.dealer),
      lastOne: getters.nextPlayerPos(getters.dealer + 2)
    });
  }
};
