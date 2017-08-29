<template>
<div>
  <v-chip class="green white--text"> {{currentPlayer.name}}</v-chip>
  <v-flex :value="lastBet" class="green white--text"> {{toggle}}</v-flex>

  <!-- class="debug" -->
  <v-slider label="Bet"
  :value="betAmount"
  :min="lastBet"
  :step="smallBlind"
  :max="currentPlayer.stack"
  @input="bet_amount"></v-slider>
  <v-btn label="Fold" @click.prevent="next_action({type: 'fold'})">Fold</v-btn>
  <v-btn
  label="knock"
  v-if="toggle"
  @click.prevent="next_action({type: 'knock'})"
  @keyup.75="next_action({type: 'knock'})">
  check</v-btn>
  <v-btn v-else label="follow" @click.prevent="bet">Follow</v-btn>

    <v-btn  :value="betAmount" @click.prevent="bet" >Bet</v-btn>
   <br/>
   <v-chip class="amber">{{betAmount}}</v-chip>

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
      // return false;
      return this.$store.getters.players
        .filter(e => !e.folded)
        .every((el, i, arr) => el.bet === arr[0].bet);
    }
  },
  methods: {
    ...mapActions(['next_action', 'bet_amount']),
    bet: function(e) {
      console.log('e', e);
      this.lastBet = this.smallBlind;
      this.next_action({ type: 'bet' });
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
