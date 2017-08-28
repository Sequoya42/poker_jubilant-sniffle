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
    } else {
      commit('nextCard', {
        cards: state.cards === 0 ? 3 : 1,
        nPlayers: getters.nPlayers
      });
      commit('betAmount', getters.smallBlind);
    }
  },

  next_player: ({ dispatch, commit, state, getters }, p) => {
    if (state.playersInHand < 2) return commit('endGame');
    let x = !!getters.players
      .filter(e => !e.folded)
      .map(e => e.bet)
      .reduce((a, b) => (a === b ? a : NaN));
    console.log('x', x);

    if (state.currentPlayerPos === state.lastOne && x) {
      dispatch('next_card', x);
    }
    commit('nextPlayer', {
      nPlayers: getters.nPlayers,
      players: getters.players
    });
    commit('allEven', x);
  },

  next_action: ({ dispatch, commit, state, getters }, p) => {
    const player = getters.currentPlayer,
      pos = getters.currentPlayerPos,
      nPlayers = getters.nPlayers,
      amount = state.betAmount;

    if (p.type === 'fold') commit('fold', { player, pos, nPlayers });
    else if (p.type === 'bet') commit('bet', { player, pos, amount });

    return dispatch('next_player');
  }
};
