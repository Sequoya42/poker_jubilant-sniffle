module.exports = {
  chooseWinner: ({ state, dispatch, commit, getters }) => {
    if (state.winners.length) {
      commit('chooseWinner', { players: getters.players });
    }

    let x = getters.players.filter(e => e.stack > getters.smallBlind);
    if (x.length === 1 && !state.pot) {
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
    let realAmount = getters.players
      .filter(p => !p.folded && !p.allIn)
      .reduce((a, b) => (a.stack > b.stack ? a : b), []).stack;
    amount = amount > realAmount ? realAmount : amount;
    console.log('amount', amount);
    commit('updateAmount', {
      amount: amount,
      numberOfPlayers: getters.nPlayers,
      updateLast: getters.prevPlayerPos(),
      bet: getters.currentPlayer.bet
    });
  },
  // ******** ********  next card  ******** ********
  next_card: ({ commit, state, getters }) => {
    if (state.cards === 5) {
      commit('endGame');
    } else {
      commit('nextCard', {
        cards: state.cards === 0 ? 3 : 1,
        players: getters.players,
        smallBlind: getters.bigBlind,
        lastOne: getters.prevPlayerPos(state.dealer + 1),
        firstOne: getters.nextPlayerPos(state.dealer)
      });
      commit('updateAmount', {
        amount: getters.bigBlind,
        nPlayers: getters.nPlayers
      });
    }
  },
  // ******** ********  next player  ******** ********
  next_player: ({ dispatch, commit, state, getters }, p) => {
    let nextPos = getters.nextPlayerPos();
    if (getters.players.filter(e => !e.folded).length < 2) {
      setTimeout(() => commit('oneWin', getters.players[nextPos]), 300);
      commit('addWinner', nextPos);
      return dispatch('chooseWinner');
    } else if (!getters.players.filter(e => !e.folded && !e.allIn)) {
      return commit('endGame');
    } else if (state.currentPlayerPos === state.lastOne) {
      dispatch('next_card');
    } else {
      commit('nextPlayer', { nextPos });
    }
  },
  all_in: ({ commit, state, getters }) => {
    commit('allIn', getters.currentPlayer);
  },
  // ******** ********  next action  ******** ********
  next_action: ({ dispatch, commit, state, getters }, p) => {
    const player = getters.currentPlayer,
      pos = getters.currentPlayerPos,
      amount = p.amount;

    commit('listActions', { player, amount: p.amount, pos: pos, type: p.type });

    if (amount && state.separatePot.every((a, i, arr) => a === arr[0])) {
      commit('updateLast', getters.prevPlayerPos());
    }

    if (p.type === 'fold')
      commit('fold', { player, pos, lastOne: getters.nextPlayerPos(pos) });
    else if (p.type === 'bet' || p.type === 'follow')
      commit('bet', { player, pos, amount });

    let x = getters.players.filter(e => !e.allIn);
    if (x.length === 0) {
      return commit('endGame');
    } else if (!getters.players.filter(e => !e.folded || e.stack === 0).length) {
      return commit('endGame');
    } else return dispatch('next_player');
  },
  // ******** ********  new hand  ******** ********
  new_hand: ({ commit, getters }, first) => {
    let pastDealer = getters.dealer;
    commit('clearPlayer', getters.players);
    let position = {
      dealer: getters.nextPlayerPos(pastDealer),
      small: getters.nextPlayerPos(pastDealer, 2),
      big: getters.nextPlayerPos(pastDealer, 3),
      last: getters.nextPlayerPos(pastDealer, 3)
    };
    commit('newHand', {
      players: getters.players,
      numberOfPlayers: getters.nPlayers,
      smallBlind: getters.smallBlind,
      position: position
    });
  }
};
