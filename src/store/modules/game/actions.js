module.exports = {
  chooseWinner: ({ state, dispatch, commit, getters }) => {
    if (state.winners.length) {
      commit('chooseWinner', { players: getters.players });
    }

    let x = getters.players.filter(e => e.stack > getters.smallBlind);
    if (x.length === 1 && !state.pot) {
      commit('reset');
      return dispatch('new_hand');
    } else if (state.separatePot.every((el, i, arr) => el === 0)) {
      return dispatch('new_hand');
    }
  },
  update_amount: ({ state, commit, getters }, amount) => {
    commit('updateAmount', { amount });
  },
  // ******** ********  next card  ******** ********
  next_card: ({ commit, state, getters }) => {
    if (state.cards === 5) {
      commit('endGame');
    } else if (getters.players.filter(e => !e.folded && !e.allIn).length < 2) {
      return commit('endGame');
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
    } else if (!getters.players.filter(e => !e.folded && !e.allIn).length) {
      return commit('endGame');
    } else if (state.currentPlayerPos === state.lastOne) {
      dispatch('next_card');
    } else {
      commit('nextPlayer', { nextPos });
    }
  },
  // ******** ********  all in  ******** ********
  all_in: ({ commit, state, getters }) => {
    commit('allIn', getters.currentPlayer);
  },
  // ******** ********  next action  ******** ********
  next_action: ({ dispatch, commit, state, getters }, p) => {
    const player = getters.currentPlayer,
      pos = getters.currentPlayerPos,
      amount = p.amount;

    commit('listActions', { player, pos, amount, type: p.type });

    if (p.type === 'fold') {
      commit('fold', { player, pos, lastOne: getters.nextPlayerPos(pos) });
    } else if (p.type == 'follow') {
      commit('follow', { player, pos, amount });
    } else if (p.type == 'bet' || p.type == 'allIn') {
      commit('bet', { player, pos, amount });
    }
    if (getters.changeLast(p.type)) {
      commit('updateLast', getters.prevPlayerPos());
    }

    if (!getters.players.filter(e => !e.folded || !e.allIn).length) {
      return commit('endGame');
    } else {
      return dispatch('next_player');
    }
  },
  // ******** ********  new hand  ******** ********
  new_hand: ({ commit, getters }, first) => {
    let pastDealer = getters.dealer;
    commit('clearPlayer', getters.players);
    commit('newHand', {
      players: getters.players,
      numberOfPlayers: getters.nPlayers,
      smallBlind: getters.smallBlind,
      position: {
        dealer: getters.nextPlayerPos(pastDealer),
        small: getters.nextPlayerPos(pastDealer, 2),
        big: getters.nextPlayerPos(pastDealer, 3),
        first: getters.nextPlayerPos(pastDealer, 4)
      }
    });
  }
};