module.exports = {
  chooseWinner: (state, { winners, players }) => {
    state.end = false;
    const amount = state.pot / winners.length;
    state.pot = 0;
    winners.forEach(w => (players[w].stack += amount));
  },

  endGame: state => (state.end = true),

  updateAmount: (state, p) => {
    if (p.amount > state.betAmount) {
      state.lastOne =
        state.currentPlayerPos === 0
          ? p.numberOfPlayers - 1
          : state.currentPlayerPos - 1;
    }
    state.betAmount = p.amount;
    // ? p.amount : state.betAmount;
    // console.log('state.lastOne', state.lastOne);
  },

  nextPlayer: (state, { nPlayers, players }) => {
    state.currentPlayerPos = (state.currentPlayerPos + 1) % nPlayers;
    while (
      players[state.currentPlayerPos].folded ||
      players[state.currentPlayerPos].lost
    ) {
      state.currentPlayerPos = (state.currentPlayerPos + 1) % nPlayers;
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
    console.log('BET');
    const playerBet = player.bet;
    let newAmount = amount;

    if (amount > playerBet) {
      newAmount -= playerBet;
    } else if (amount > player.stack) {
      newAmount = player.stack;
      state.separatePot, push({ pos, amount: state.pot + newAmount });
    }
    player.bet = amount;
    state.betAmount = amount;
    state.pot += newAmount;
    player.stack -= newAmount;
  },

  // ******** ********  next_card stuff  ******** ********
  nextCard: (state, p) => {
    console.log('next card');
    state.cards += p.cards;
    state.betAmount = p.smallBlind;
    p.players.forEach((e, i) => {
      e.bet = 0;
    });
    state.currentPlayerPos = state.dealer;
    while (p.players[state.currentPlayerPos].folded)
      state.currentPlayerPos += 1 % p.nPlayers;

    state.lastOne = state.currentPlayerPos;
    // state current player pos will be state.dealer + 1 since next player is calledafter
    state.currentPlayerPos = state.dealer;
  },

  newHand: (state, { players, numberOfPlayers, smallBlind }) => {
    function putBlind(small, big) {
      players[(state.dealer + big) % numberOfPlayers].bet += smallBlind * 2;
      players[(state.dealer + small) % numberOfPlayers].bet += smallBlind;
      players[(state.dealer + big) % numberOfPlayers].stack -= smallBlind * 2;
      players[(state.dealer + small) % numberOfPlayers].stack -= smallBlind;
    }

    players.forEach((e, i) => {
      e.folded = false;
      e.bet = 0;
      // if (e.stack <= 0) e.lost = true;
    });
    // if (players.length - todel.length < 2) {
    //   console.log('END GAME END GAME END GAE');
    // }
    state.dealer = (state.dealer + 1) % numberOfPlayers;
    state.cards = 0;
    state.lastOne = numberOfPlayers - 1;
    state.currentPlayerPos = (state.dealer + 3) % numberOfPlayers;
    state.playersInHand = numberOfPlayers;
    state.betAmount = smallBlind * 2;
    state.separatePot = [];

    if (numberOfPlayers === 2) {
      putBlind(2, 1);
    } else {
      putBlind(1, 2);
    }
    state.pot = smallBlind * 3;
  }
};
