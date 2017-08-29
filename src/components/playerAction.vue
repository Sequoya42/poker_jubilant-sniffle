<template>
<div>
  <v-chip class="green white--text"> {{currentPlayer.name}}</v-chip>
  <v-flex :value="lastBet" class="green white--text"> {{toggle}}</v-flex>

  <!-- class="debug" -->
  <!-- @input="bet_amount" -->
  <!-- :value="betAmount" -->
  <!-- :step="smallBlind" -->
  <!-- <v-slider label="Bet"
  v-model="lastBet"
  :min="betAmount"
  :max="currentPlayer.stack"
  ></v-slider> -->

  //TODO
  /*
make buttons instead of slider and bet button
big blind,
pot,
half-pot
all in
  */

  <v-btn label="bigBlind">big Blind</v-btn>

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
   <v-chip class="amber">{{ lastBet }} {{10}}</v-chip>

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
    ...mapGetters(['betAmount', 'currentPlayer', 'smallBlind']),
    toggle: function() {
      return this.$store.getters.players
        .filter(e => !e.folded)
        .every((el, i, arr) => el.bet === arr[0].bet);
    }
  },
  methods: {
    ...mapActions(['next_action', 'bet_amount']),
    bet: function(e) {
      console.log('e', e);
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
