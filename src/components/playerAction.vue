<template>
<div>
  <v-chip class="green white--text"> {{currentPlayer.name}}</v-chip>
  <v-flex class="green white--text"> {{toggle}}</v-flex>

  <v-slider label="Bet"
  v-model="lastBet"
  :min="betAmount"
  :max="currentPlayer.stack"
  ></v-slider>



  <v-btn label="Fold" @click.prevent="next_action({type: 'fold'})">Fold</v-btn>
  <v-btn
  label="knock"
  v-if="toggle"
  @click.prevent="next_action({type: 'knock'})"
  @keyup.75="next_action({type: 'knock'})">
  check</v-btn>
  <v-btn v-else label="follow" @click.prevent="bet(betAmount)">Follow</v-btn>

    <v-btn  :value="betAmount" @click.prevent="bet(lastBet)" >Bet</v-btn>
   <br/>
   <v-btn label="bigBlind" @click.prevent="bet(bigBlind)">{{bigBlind}}</v-btn>
   <v-btn label="pot" @click.prevent="bet(pot)">{{pot}}</v-btn>
   <br/>
   <v-chip class="amber">{{ betAmount }} and last {{lastBet}}</v-chip>

</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'playerAction',

  data: function() {
    return {
      lastBet: this.$store.state.game.betAmount
    };
  },
  computed: {
    ...mapGetters([
      'betAmount',
      'currentPlayer',
      'smallBlind',
      'bigBlind',
      'pot'
    ]),
    toggle: function() {
      let x = this.$store.getters.players
        .filter(e => !e.folded)
        .every((el, i, arr) => el.bet === arr[0].bet);
      if (x) this.lastBet = this.bigBlind;
      return x;
    }
  },
  methods: {
    ...mapActions(['next_action', 'update_amount']),
    bet: function(e) {
      console.log('e', e);
      if (e > this.betAmount) this.$store.dispatch('update_amount', e);
      this.next_action({ type: 'bet', amount: e });
    }
  },
  components: {
    // raiseDialog: require('./raiseDialog.vue'),
  }
};
</script>

<style>
.debug{
border: 5px solid black;
margin-bottom: 100px;
}
</style>
