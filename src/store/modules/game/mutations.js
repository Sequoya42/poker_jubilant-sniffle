module.exports = {
  reset: (state, { winners, players }) => {
    state.end = false;
    const amount = state.pot / winners.length;
    state.pot = 0;
    winners.forEach(w => (players[w].stack += amount));
  },

  betAmount: (state, p) => {
    state.betAmount = p;
  },

  skipFolded: (state, { players, nPlayers }) => {
    let isFolded = players[state.currentPlayerPos].folded;
    while (isFolded) {
      state.currentPlayerPos = isFolded
        ? (state.currentPlayerPos + 1) % nPlayers
        : state.currentPlayerPos;
      isFolded = players[state.currentPlayerPos].folded;
    }
  },

  nextPlayer: (state, { nPlayers }) => {
    state.currentPlayerPos = (state.currentPlayerPos + 1) % nPlayers;
  },

  fold: (state, { player }) => {
    player.folded = true;
    state.playersInHand -= 1;
  },

  bet: (state, { pos, player, amount }) => {
    const playerBet = state.playerBets[pos];
    const newAmount = amount > playerBet ? amount - playerBet : amount;

    state.pot += newAmount;
    state.playerBets[pos] = newAmount;
    player.stack -= newAmount;
  },

  // ******** ********  next_card stuff  ******** ********
  nextCard: (state, p) => {
    state.cards += p.cards;
    state.betAmount = p.amount;
  },

  newHand: (state, { first, players, numberOfPlayers, smallBlind }) => {
    if (!first) {
      state.end = true;
      let pastDealer = players.shift();
      players.push(pastDealer);
    }
    // redo this, order of thing call after pot distributed to winners
    // players.forEach(e => (e.folded = false));

    state.cards = 0;
    state.playersInHand = numberOfPlayers;
    state.betAmount = smallBlind;
    state.lastOne = 3 % numberOfPlayers;
    if (numberOfPlayers === 2) {
      state.lastOne = 0;
      players[(state.dealer + 2) % numberOfPlayers].stack -= smallBlind;
      players[(state.dealer + 1) % numberOfPlayers].stack -= smallBlind * 2;
    } else {
      players[(state.dealer + 1) % numberOfPlayers].stack -= smallBlind;
      players[(state.dealer + 2) % numberOfPlayers].stack -= smallBlind * 2;
    }
    state.pot = smallBlind * 3;
  }
};
