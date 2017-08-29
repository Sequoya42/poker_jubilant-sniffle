<template>
<div>
  <v-chip class="green white--text"> {{currentPlayer.name}}</v-chip>

  <v-slider
  label="Bet"
  class="green sliderDesign"
  v-model="lastBet"
  :min="betAmount"
  :max="currentPlayer.stack"
  ></v-slider>



  <v-btn label="Fold" @click.prevent="next_action({type: 'fold'})">Fold</v-btn>
  <v-btn
  v-if="lastBet > betAmount"
  :value="betAmount"
  @click.prevent="bet(lastBet)" >Bet</v-btn>
  <v-btn
  label="knock"
  v-else-if="toggle"
  @click.prevent="next_action({type: 'knock'})"
  @keyup.75="next_action({type: 'knock'})">
  check</v-btn>
  <v-btn v-else label="follow" @click.prevent="bet(betAmount)">Follow</v-btn>

   <br/>
   <v-chip class="amber">{{lastBet}}</v-chip>
   <br/>
   <v-btn  class="primary green darken-3" :value="betAmount" @click.prevent="bet(pot)" >pot: {{pot}}</v-btn>

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
      console.log('x', x);
      if (x) {
        this.lastBet = 0;
        console.log('this.lastBet', this.lastBet);
      }
      return x;
    }
  },
  methods: {
    ...mapActions(['next_action', 'update_amount']),
    bet: function(e) {
      if (e > this.betAmount) {
        this.$store.dispatch('update_amount', e);
      }
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

.sliderDesign {
  background-color: #cccccc !important;
  box-shadow: 1px;
    /*background: red;*/
}
</style>
