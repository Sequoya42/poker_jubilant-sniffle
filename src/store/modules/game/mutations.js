module.exports = {
  betAmount: (state, p) => {
    state.betAmount = p;
  },

  skipFolded: (state, { nPlayers }) => {
    let isFolded = players[state.currentPlayerPos].folded;
    while (isFolded) {
      console.log('while');
      state.currentPlayerPos = isFolded
        ? (state.currentPlayerPos + 1) % state.playersInHand
        : state.currentPlayerPos;
      isFolded = players[state.currentPlayerPos].folded;
    }
  },

  nextPlayer: (state, { nPlayers }) => {
    state.currentPlayerPos = (state.currentPlayerPos + 1) % state.playersInHand;
    console.log('playersInHand', state.playersInHand);
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

  // ******** ********  next_card stuff  ******** ********
  flop: (state, { player, smallBlind }) => {
    state.cards = 3;
    state.betAmount = smallBlind;
  },

  turnRiver: (state, { player, smallBlind }) => {
    state.cards += 1;
    state.betAmount = smallBlind;
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
  },

  playersInHand: (state, { players, numberOfPlayers }) => {
    state.playersInHand = players
      .map(p => p.folded)
      .reduce((a, b) => (a += !b), 0);
    console.log('init', state.playersInHand);
  }
};
