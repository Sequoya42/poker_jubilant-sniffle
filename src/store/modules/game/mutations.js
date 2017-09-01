module.exports = {
  chooseWinner: (state, { players }) => {
    winners = state.winners;
    if (state.separatePot.every((el, i, arr) => el === arr[0])) {
      //all bet the same amount
      const amount = state.pot / winners.length;
      winners.forEach(w => {
        players[w].stack += amount;
      });
      state.pot = 0;
      state.end = false;
      state.winners = [];
    } else {
      winners.forEach(w => {
        let maxWinPlayer = 0;
        let a = state.separatePot[w];
        state.separatePot.forEach((spot, it) => {
          let part = spot >= a ? a / winners.length : spot / winners.length;
          maxWinPlayer += part;
          spot -= part;
        });
        players[w].stack += maxWinPlayer;
        if (a === 0) {
          state.winners.splice(w, 1);
        }
      });
      // ******** ********  test  ******** ********
      // ******** ********  test  ******** ********

      // if lost but bet more, get money back
      // state.separatePot.forEach((e, i) => (players[i].stack += e));
    }
  },

  getMoneyBack: (state, players) => {
    state.separatePot.forEach((e, i) => (players[i].stack += e));
    state.end = false;
  },

  endGame: state => (state.end = true),

  oneWin: (state, p) => (state.oneWin = p.name),

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
  },

  nextPlayer: (state, { nPlayers, players }) => {
    state.currentPlayerPos = (state.currentPlayerPos + 1) % nPlayers;
    while (
      players[state.currentPlayerPos].folded ||
      players[state.currentPlayerPos].stack === 0
    ) {
      state.currentPlayerPos = (state.currentPlayerPos + 1) % nPlayers;
    }
  },
  // ******** ********  bet stuff  ******** ********

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
    state.lastOne = state.separatePot.indexOf(
      state.separatePot.reduce((a, b) => (a > b ? a : b))
    );
    if (amount > playerBet && amount < player.stack) {
      newAmount -= playerBet;
    } else if (amount >= player.stack) {
      newAmount = player.stack;
      // state.playersInHand -= 1;
    }
    state.separatePot.splice(pos, 1, state.separatePot[pos] + newAmount);
    player.bet = amount;
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
    while (p.players[state.currentPlayerPos].folded) {
      state.currentPlayerPos += 1 % p.nPlayers;
    }

    state.lastOne = state.currentPlayerPos;
    // state current player pos will be state.dealer + 1 since next player is calledafter
    state.currentPlayerPos = state.dealer;
  },

  newHand: (state, { players, numberOfPlayers, smallBlind, dealer }) => {
    function putBlind(small, big, nPlayers) {
      players[(state.dealer + big) % nPlayers].bet += smallBlind * 2;
      players[(state.dealer + small) % nPlayers].bet += smallBlind;
      players[(state.dealer + big) % nPlayers].stack -= smallBlind * 2;
      players[(state.dealer + small) % nPlayers].stack -= smallBlind;

      state.separatePot[(state.dealer + small) % nPlayers] = smallBlind;
      state.separatePot[(state.dealer + big) % nPlayers] = smallBlind * 2;
    }

    players.forEach((e, i) => {
      e.folded = e.stack <= 0 ? (e.lost = true) : false;
      e.bet = 0;
    });
    state.playersInHand = players.filter(e => !e.lost).length;
    state.dealer = dealer;
    state.cards = 0;
    state.lastOne = state.playersInHand - 1;
    state.currentPlayerPos = (state.dealer + 3) % state.playersInHand;
    state.betAmount = smallBlind * 2;
    state.separatePot = new Array(3).fill(0);

    if (state.playersInHand === 2) {
      putBlind(2, 1, state.playersInHand);
    } else {
      putBlind(1, 2, state.playersInHand);
    }
    state.pot = smallBlind * 3;
    state.oneWin = false;
  }
};
