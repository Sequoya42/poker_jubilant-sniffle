module.exports = {
  chooseWinner: (state, { players }) => {
    let winners = state.winners;
    let totWin = winners.reduce((a, b) => a + state.separatePot[b], 0);
    winners.forEach(w => {
      players[w].stack += Math.floor(
        (1 + (state.pot / totWin - 1)) * state.separatePot[w]
      );
    });
    state.pot = 0;
    state.end = false;
    state.winners = [];
    state.separatePot = [0];
  },

  getMoneyBack: (state, players) => {
    state.separatePot.forEach((e, i) => (players[i].stack += e));
    state.end = false;
  },

  endGame: state => (state.end = true),

  oneWin: (state, p) => (state.oneWin = p.name),

  playerOneDeals: state => (state.dealer = -1),

  updateLast: (state, lastOne) => (state.lastOne = lastOne),
  addWinner: (state, nextPos) => {
    if (state.winners.includes(nextPos))
      state.winners.splice(state.winners.indexOf(nextPos), 1);
    else state.winners.push(nextPos);
  },

  updateAmount: (state, p) => {
    if (p.amount > state.betAmount) {
      state.lastOne =
        state.currentPlayerPos === 0
          ? p.numberOfPlayers - 1
          : state.currentPlayerPos - 1;
    }
    state.betAmount = p.amount;
    console.log('amount updated');
  },

  nextPlayer: (state, { nPlayers, players }) => {
    state.currentPlayerPos = (state.currentPlayerPos + 1) % nPlayers;
    while (
      players[state.currentPlayerPos].folded ||
      players[state.currentPlayerPos].stack === 0
    ) {
      console.log('whilenextpalyer');
      state.currentPlayerPos = (state.currentPlayerPos + 1) % nPlayers;
    }
  },
  // ******** ********  bet stuff  ******** ********

  fold: (state, { player, pos, lastOne }) => {
    if (state.lastOne === pos) {
      state.lastOne = lastOne;
    }
    player.folded = true;
    state.playersInHand -= 1;
  },

  bet: (state, { pos, player, amount }) => {
    const playerBet = player.bet;
    let newAmount = amount;
    if (amount > playerBet && amount < player.stack) {
      newAmount -= playerBet;
    } else if (amount >= player.stack) {
      newAmount = player.stack;
    }
    state.separatePot.splice(pos, 1, state.separatePot[pos] + newAmount);
    player.bet = amount;
    state.pot += newAmount;
    player.stack -= newAmount;
  },

  // ******** ********  next_card stuff  ******** ********
  nextCard: (state, p) => {
    state.cards += p.cards;
    p.players.map(e => (e.bet = 0));

    state.lastOne = p.lastOne;
    // state current player pos will be state.dealer + 1 since next player is calledafter
    state.currentPlayerPos = state.dealer;
  },

  newHand: (state, { players, numberOfPlayers, smallBlind, dealer, lastOne }) => {
    function putBlind(small, big, nPlayers) {
      players[(state.dealer + big) % nPlayers].bet += smallBlind * 2;
      players[(state.dealer + small) % nPlayers].bet += smallBlind;
      players[(state.dealer + big) % nPlayers].stack -= smallBlind * 2;
      players[(state.dealer + small) % nPlayers].stack -= smallBlind;

      state.separatePot[(state.dealer + small) % nPlayers] = smallBlind;
      state.separatePot[(state.dealer + big) % nPlayers] = smallBlind * 2;
    }

    players.forEach((e, i) => {
      console.log('inforeach');
      e.folded = e.stack <= 0 ? (e.lost = true) : false;
      e.bet = 0;
    });
    state.playersInHand = players.filter(e => !e.lost).length;
    state.dealer = dealer;
    state.cards = 0;
    state.lastOne = lastOne;
    state.currentPlayerPos = (state.dealer + 3) % state.playersInHand;
    state.betAmount = smallBlind * 2;
    state.separatePot = Array(numberOfPlayers).fill(0);

    if (state.playersInHand === 2) {
      putBlind(2, 1, state.playersInHand);
    } else {
      putBlind(1, 2, state.playersInHand);
    }
    state.pot = smallBlind * 3;
    state.oneWin = false;
    state.end = false;
    console.log('new handdone supposedly');
  }
};
