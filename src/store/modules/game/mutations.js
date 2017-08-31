module.exports = {
  //order winner if different bet amount etc
  // multipleWinners: (state, { winners, players, reset }) => {},
  //ugl asf, to refacto
  chooseWinner: (state, { winners, players, reset }) => {
    if (state.separatePot.every((el, i, arr) => el === arr[0])) {
      const amount = state.pot / winners.length;
      winners.forEach(w => (players[w].stack += amount));
    } else {
      winners = winners.filter(e => !players[e].folded);
      console.log('separatePot THING ELSE');
      // separatePot thing
      let i = winners.length;
      winners.forEach(w => {
        let x = 0;
        let a = state.separatePot[w];
        state.separatePot.forEach((e, it) => {
          if (e >= a) {
            x += a / i;
            e -= a / i;
          } else {
            // 50 < 100
            x += e / i;
            e -= e / i;
          }
        });
        players[w].stack += x;
      });
      // if lost but bet more, get money back
      state.separatePot.forEach((e, i) => (players[i].stack += e));
    }

    state.pot = 0;
    state.end = false;
  },

  endGame: state => (state.end = true),

  oneWin: (state, p) => (state.oneWin = p.name),

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

  newHand: (state, { players, numberOfPlayers, smallBlind }) => {
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
    state.dealer = (state.dealer + 1) % state.playersInHand;
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
