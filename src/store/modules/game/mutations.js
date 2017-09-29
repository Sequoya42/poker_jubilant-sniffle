const newPot = (separatePot, amount) => {
  return separatePot.map(p => {
    if (p > 0) {
      p -= amount;
    }
    if (p < 0) {
      p = 0;
    }
    return p;
  });
};

module.exports = {
  chooseWinner: (state, { players }) => {
    winners = state.winners;
    let winerPot = 0;
    let validPlayers = state.separatePot.filter(e => e != 0).length;
    state.winners.map(w => (winerPot += state.separatePot[w]));
    let money = winerPot > state.pot ? state.pot : winerPot;
    money *= validPlayers;
    winners.map(w => {
      players[w].stack += Math.floor(state.separatePot[w] / winerPot * money);
    });
    state.separatePot = newPot(state.separatePot, money / validPlayers);
    state.pot -= money;
    console.log('state.pot', state.pot);
    validPlayers = state.separatePot.filter(e => e != 0).length;
    if (validPlayers == 1) {
      winner = state.separatePot.reduce((a, b, i) => {
        if (b != 0) a = i;
        return a;
      }, 0);
      players[winner].stack += state.pot;
      state.pot = 0;
    }
    if (state.pot <= 0) {
      state.pot = 0;
      state.end = false;
      state.separatePot = [0];
    }
    state.winners = [];
  },

  getMoneyBack: (state, players) => {
    state.separatePot.forEach((e, i) => (players[i].stack += e));
    state.end = false;
  },

  endGame: state => (state.end = true),

  oneWin: (state, p) => (state.oneWin = p.name),

  playerOneDeals: state => (state.dealer = -1),

  updateLast: (state, lastOne) => {
    state.lastOne = lastOne;
  },

  addWinner: (state, nextPos) => {
    if (state.winners.includes(nextPos))
      state.winners.splice(state.winners.indexOf(nextPos), 1);
    else state.winners.push(nextPos);
  },

  updateAmount: (state, p) => {
    if (p.amount > state.betAmount) {
      state.lastOne = p.updateLast;
    }
    state.betAmount = p.amount;
  },

  nextPlayer: (state, { nPlayers, players }) => {
    let i = 0;
    state.currentPlayerPos = (state.currentPlayerPos + 1) % nPlayers;
    while (
      players[state.currentPlayerPos].folded ||
      players[state.currentPlayerPos].stack === 0
    ) {
      i++;
      if (i > players.length * 2) break;
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

  allIn: (state, currentPlayer) => {
    currentPlayer.allIn = true;
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
    players.map((e, i) => {
      e.folded = e.stack <= 0 ? (e.lost = true) : false;
      e.allIn = false;
      e.bet = 0;
    });
  },

  listActions: (state, p) => {
    state.listActions.push(
      `${p.player.name} ${p.type} ${p.type === 'bet' ? p.amount : ''}`
    );
  },

  newHand: (state, { players, numberOfPlayers, smallBlind, position }) => {
    function putBlind(small, big, nPlayers) {
      players[big].bet += smallBlind * 2;
      players[small].bet += smallBlind;
      players[big].stack -= smallBlind * 2;
      players[small].stack -= smallBlind;

      state.separatePot[small] = smallBlind;
      state.separatePot[big] = smallBlind * 2;
    }

    state.playersInHand = players.filter(e => !e.lost).length;
    state.dealer = position.dealer;
    state.cards = 0;
    state.lastOne = position.last;
    state.currentPlayerPos = (state.dealer + 3) % state.playersInHand;
    state.betAmount = smallBlind * 2;
    state.separatePot = Array(numberOfPlayers).fill(0);

    if (state.playersInHand === 2) {
      state.currentPlayerPos = position.dealer;
      putBlind(position.big, position.small, state.playersInHand);
    } else {
      putBlind(position.small, position.big, state.playersInHand);
    }
    state.pot = smallBlind * 3;
    state.listActions = [];
    state.oneWin = false;
    state.end = false;
  }
};
//
