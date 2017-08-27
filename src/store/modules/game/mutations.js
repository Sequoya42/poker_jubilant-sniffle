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
    const playerBet = state.playerBets[pos];
    let newAmount = amount > playerBet ? amount - playerBet : amount;
    state.pot += newAmount;
    state.playerBets[pos] = newAmount;
    player.stack -= newAmount;
  },

  // ******** ********  next_card stuff  ******** ********
  nextCard: (state, p) => {
    console.log('next card');
    state.cards += p.cards;
    state.playerBets = [];
  },

  newHand: (state, { first, players, numberOfPlayers, smallBlind }) => {
    console.log('is this called');
    if (!first) {
      // state.end = true;
      let pastDealer = players.shift();
      players.push(pastDealer);
    }
    // redo this, order of thing call after pot distributed to winners
    players.forEach(e => (e.folded = false));

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
/*
dealer last one to talk

last one - 1 if dealer so to the right //circular buffer
*/
// skipFolded: (state, { players, nPlayers }) => {
//   let isFolded = players[state.currentPlayerPos].folded;
//   while (isFolded) {
//     state.currentPlayerPos = isFolded
//     ? (state.currentPlayerPos + 1) % nPlayers
//     : state.currentPlayerPos;
//     isFolded = players[state.currentPlayerPos].folded;
//   }
// },
