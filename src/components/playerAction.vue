<template>
<div>
  <v-chip class="green white--text"> {{currentPlayer.name}}</v-chip>
  <v-slider label="Bet"
  :value="betAmount"
  :min="lastBet"
  :step="smallBlind"
  :max="currentPlayer.stack"
  @input="bet_amount"></v-slider>
  <v-btn label="Fold" @click.prevent="next_action({type: 'fold'})">Fold</v-btn>
  <v-btn
  label="knock"
  v-if="!playerBets.length"
  @click.prevent="next_action({type: 'knock'})"
  @keyup.75="next_action({type: 'knock'})">
  check</v-btn>
  <v-btn v-else label="follow" @click.prevent="next_action({type: 'bet'})">Follow</v-btn>

    <v-btn @click.prevent="bet" >Bet</v-btn>
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
    ...mapGetters(['playerBets', 'betAmount', 'currentPlayer', 'smallBlind'])
  },
  methods: {
    ...mapActions(['next_action', 'bet_amount']),
    bet: function() {
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
</style>
