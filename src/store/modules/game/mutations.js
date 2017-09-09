module.exports = {
  chooseWinner: (state, { players }) => {
    winners = state.winners;
    // if (state.separatePot.every((el, i, arr) => el === arr[0])) {
    //all bet the same amount
    const amount = state.pot / winners.length;
    winners.forEach(w => {
      players[w].stack += amount;
    });
    state.pot = 0;
    state.end = false;
    state.winners = [];
    state.separatePot = [0];
    // }
    //  else {
    //   console.log('in the else winners');
    //   // there's an order
    //   winners.forEach(w => {
    //     let maxWinPlayer = 0;
    //     let a = state.separatePot[w];
    //     state.separatePot = state.separatePot.map((spot, it) => {
    //       let part = spot >= a ? a / winners.length : spot / winners.length;
    //       maxWinPlayer += part;
    //       spot -= part;
    //       return spot;
    //     });
    //     console.log('maxWinPlayer', maxWinPlayer);
    //     players[w].stack += maxWinPlayer;
    //     if (a === 0) {
    //       state.winners.splice(w, 1);
    //     }
    //   });
    //   console.log('winners', winners);
    //   // ******** ********  test  **** **** ********
    // ******** ********  test  ******** ********

    // if lost but bet more, get money back
    // state.separatePot.forEach((e, i) => (players[i].stack += e));
    // }
  },

  getMoneyBack: (state, players) => {
    state.separatePot.forEach((e, i) => (players[i].stack += e));
    state.end = false;
  },

  endGame: state => (state.end = true),

  oneWin: (state, p) => (state.oneWin = p.name),

  playerOneDeals: state => (state.dealer = -1),

  updateLast: (state, lastOne) => {
    console.log('lastOne', lastOne);
    state.lastOne = lastOne;
  },

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
    let i = 0;
    state.currentPlayerPos = (state.currentPlayerPos + 1) % nPlayers;
    if (state.playersInHand === 1) console.log('DONE GAME');
    else {
      while (
        players[state.currentPlayerPos].folded ||
        players[state.currentPlayerPos].stack === 0
      ) {
        i++;
        if (i > players.length * 2) break;
        console.log('WHILE INFINITE');
        state.currentPlayerPos = (state.currentPlayerPos + 1) % nPlayers;
      }
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

  clearPlayer: (state, players) => {
    players = players.map((e, i) => {
      e.folded = e.stack <= 0 ? (e.lost = true) : false;
      e.bet = 0;
    });
  },

  listActions: (state, p) => {
    state.listActions.push(
      `${p.player.name} ${p.type} ${p.type === 'bet' ? p.amount : ''}`
    );
  },

  newHand: (state, { players, numberOfPlayers, smallBlind, dealer, lastOne }) => {
    console.log('dealer', dealer);
    console.log('lastOne', lastOne);
    function putBlind(small, big, nPlayers) {
      players[(dealer + big) % nPlayers].bet += smallBlind * 2;
      players[(dealer + small) % nPlayers].bet += smallBlind;
      players[(dealer + big) % nPlayers].stack -= smallBlind * 2;
      players[(dealer + small) % nPlayers].stack -= smallBlind;

      state.separatePot[(dealer + small) % nPlayers] = smallBlind;
      state.separatePot[(dealer + big) % nPlayers] = smallBlind * 2;
    }

    players.forEach((e, i) => {
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
      state.lastOne = (dealer + 1) % 2;
      state.currentPlayerPos = dealer;
      console.log('state.lastOne', state.lastOne);
      putBlind(2, 1, state.playersInHand);
    } else {
      putBlind(1, 2, state.playersInHand);
    }
    state.pot = smallBlind * 3;
    state.listActions = [];
    state.oneWin = false;
    state.end = false;
  }
};
//
