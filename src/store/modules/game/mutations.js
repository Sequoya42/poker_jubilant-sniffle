module.exports = {
  chooseWinner: (state, { players }) => {
    const validPlayers = state.separatePot.filter(e => e > 0).length;
    const winners = state.winners.map((w, i) => {
      return { index: w, pot: state.separatePot[w] };
    });

    winners.sort((a, b) => a.pot > b.pot);
    console.log('winners', winners);
    winners.map(w => {
      console.log('inside foreach', w);
      let amount = Math.floor(w.pot * validPlayers / winners.length);
      amount = amount > state.pot ? state.pot : amount;
      console.log('amount', amount);
      console.log(
        'players[w.index].stack',
        players[w.index].name,
        players[w.index].stack
      );
      winners.map(w => {
        players[w.index].stack += amount;
      });
      // players[w.index].stack += amount;
      console.log(
        'AFTER players[w.index].stack',
        players[w.index].name,
        players[w.index].stack
      );
      state.separatePot = state.separatePot.map(p => {
        p -= w.pot;
        if (p < 0) p = 0;
        state.pot -= w.pot;
        return p;
      });
    });
    // ******** ********  lesbails  ******** ********
    if (state.pot <= 0) {
      console.log('LE RESET');
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

  nextPlayer: (state, { nextPos }) => {
    state.currentPlayerPos = nextPos;
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
    state.currentPlayerPos = p.firstOne;
    // state current player pos will be state.dealer + 1 since next player is calledafter
    // state.currentPlayerPos = state.dealer;
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
