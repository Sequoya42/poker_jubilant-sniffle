module.exports = {
  betAmount: (state, p) => {
    state.betAmount = p;
  },

  skipFolded: (state, { players, nPlayers }) => {
    let isFolded = players[state.currentPlayerPos].folded;
    while (isFolded) {
      console.log('while');
      state.currentPlayerPos = isFolded
        ? (state.currentPlayerPos + 1) % nPlayers
        : state.currentPlayerPos;
      isFolded = players[state.currentPlayerPos].folded;
    }
  },

  nextPlayer: (state, { nPlayers }) => {
    state.currentPlayerPos = (state.currentPlayerPos + 1) % nPlayers;
    console.log('playersInHand', nPlayers);
    console.log('currentPlayerPos', state.currentPlayerPos);
  },

  fold: (state, { player }) => {
    player.folded = true;
    state.playersInHand -= 1;
  },

  follow: (state, { player }) => {
    state.pot += state.betAmount;
    player.stack -= state.betAmount;
  },

  raise: (state, { player }) => {
    state.pot += state.betAmount;
    player.stack -= state.betAmount;
  },

  allIn: (state, { player }) => {
    state.pot += player.stack;
    player.stack = 0;
  },
  playersInHand: (state, { players, numberOfPlayers }) => {
    state.playersInHand = players
      .map(p => p.folded)
      .reduce((a, b) => (a += !b), 0);
    console.log('init', state.playersInHand);
  },

  // ******** ********  next_card stuff  ******** ********
  nextCard: (state, p) => {
    state.cards += p.cards;
    state.betAmount = p.betAmount;
  },
  clearHand: (state, { players, numberOfPlayers, smallBlind }) => {
    players.forEach(e => (e.folded = false));
    state.cards = 0;
    state.playersInHand = numberOfPlayers;
    state.betAmount = smallBlind;
    let pastDealer = players.shift();
    players.push(pastDealer);
    state.dealer = state.dealer === numberOfPlayers - 1 ? 0 : state.dealer + 1;
    players[(state.dealer + 1) % numberOfPlayers].stack - smallBlind;
    players[(state.dealer + 2) % numberOfPlayers].stack - smallBlind * 2;
  }
};
