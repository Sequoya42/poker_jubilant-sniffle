module.exports = {
  chooseWinner: (state, { winners, players }) => {
    state.end = false;
    const amount = state.pot / winners.length;
    state.pot = 0;
    winners.forEach(w => (players[w].stack += amount));
  },

  endGame: state => (state.end = true),

  betAmount: (state, p) => (state.betAmount = p),

  nextPlayer: (state, { nPlayers, players }) => {
    state.currentPlayerPos = (state.currentPlayerPos + 1) % nPlayers;
    while (players[state.currentPlayerPos].folded) {
      state.currentPlayerPos = state.currentPlayerPos + 1 % nPlayers;
    }
  },

  fold: (state, { player, pos, nPlayers }) => {
    if (state.lastOne === pos) {
      state.lastOne = state.lastOne === 0 ? nPlayers - 1 : state.lastOne - 1;
    }
    player.folded = true;
    state.playersInHand -= 1;
  },

  bet: (state, { pos, player, amount }) => {
    const playerBet = player.bet;
    let newAmount = amount;
    console.log('playerBet', playerBet, amount, newAmount);

    if (amount > playerBet) {
      state.lastOne = pos;
      newAmount -= playerBet;
    }
    player.bet = amount;
    state.pot += newAmount;
    player.stack -= newAmount;
  },

  // ******** ********  next_card stuff  ******** ********
  nextCard: (state, p) => {
    console.log('next card');
    state.cards += p.cards;
    // state.currentPlayerPos = 1;
  },

  allEven: (state, x) => (state.allEven = x),

  newHand: (state, { first, players, numberOfPlayers, smallBlind }) => {
    if (!first) {
      let pastDealer = players.shift();
      players.push(pastDealer);
    } else {
    }
    players.forEach(e => {
      e.folded = false;
      e.bet = 0;
    });

    state.cards = 0;
    state.lastOne = numberOfPlayers - 1;
    state.currentPlayerPos = 3 % numberOfPlayers;
    state.playersInHand = numberOfPlayers;
    state.betAmount = smallBlind;
    if (numberOfPlayers === 2) {
      players[2 % numberOfPlayers].stack -= smallBlind;
      players[1 % numberOfPlayers].stack -= smallBlind * 2;
    } else {
      players[1 % numberOfPlayers].stack -= smallBlind;
      players[2 % numberOfPlayers].stack -= smallBlind * 2;
    }
    state.pot = smallBlind * 3;
  }
};
