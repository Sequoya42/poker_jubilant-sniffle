<template>
<v-flex>
  <v-slider :step="betAmount"
    snap
    thumb-label
    class="sliderDesign"
    v-model="amount"
    :min="betAmount"
    :max="Math.max(currentPlayer.stack, betAmount)"></v-slider>

  <v-btn label="Fold"
    @click.prevent="next_action({type: 'fold'})">Fold</v-btn>

  <v-btn label="knock"
    v-if="toggle"
    @click.prevent="next_action({type: 'knock'})"
    @keyup.75="next_action({type: 'knock'})">
    check</v-btn>

  <v-btn v-else
    label="follow"
    @click.prevent="bet(betAmount, 'follow')">Follow</v-btn>

  <v-btn v-if="canBet"
    :value="betAmount"
    @click.prevent="bet(amount)">Bet</v-btn>
  <v-btn v-if="!currentPlayer.allIn"
    label="allIn"
    @click.prevent="bet(currentPlayer.stack, 'allIn')">AllIn</v-btn>

</v-flex>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex';

export default {
  name: 'playerAction',

  data: function() {
    return {
      amount: this.$store.state.game.betAmount
    };
  },
  watch: {
    cards: function(value) {
      this.amount = this.smallBlind;
    },
    currentPlayer: function(value) {
      this.amount = this.betAmount;
    }
  },
  computed: {
    ...mapGetters([
      'minStack',
      'betAmount',
      'currentPlayer',
      'smallBlind',
      'bigBlind',
      'cards',
      'pot'
    ]),
    toggle: function() {
      let x = this.$store.getters.players
        .filter(e => !e.folded && !e.lost)
        .every((el, i, arr) => el.bet === arr[0].bet);
      if (x) this.amount = this.bigBlind;
      return x;
    },
    canBet: function() {
      return (
        (this.currentPlayer.stack > this.amount &&
          this.amount > this.betAmount) ||
        this.$store.getters.players.every(e => e.bet == 0)
      );
    }
  },
  methods: {
    ...mapActions(['next_action', 'update_amount']),
    bet: function(e, type = 'bet') {
      let amount = e;
      if (
        type == 'allIn' ||
        e - this.currentPlayer.bet >= this.currentPlayer.stack
      ) {
        type = 'allIn';
        this.$store.dispatch('all_in');
        if (amount < this.betAmount) amount += this.currentPlayer.bet;
      }

      this.$store.dispatch('update_amount', +amount);
      this.$store.dispatch('next_action', {
        type,
        amount
      });
    }
  }
};
</script>

<style>
.sliderDesign {
  margin: 0;
  /* align-self: center; */
  width: 60vw;
  padding: 0;
  height: 15vmin;
}
</style>
