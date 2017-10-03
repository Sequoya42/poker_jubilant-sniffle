<template>
<div>
  <v-chip class="green white--text"> {{currentPlayer.name}}</v-chip>
  <v-chip class="amber">{{lastBet}}  </v-chip>
  <v-chip class="red darken-4">{{betAmount}}  </v-chip>

  <v-slider
  :step="betAmount"
  snap
  thumb-label
  class="sliderDesign"
  v-model="lastBet"
  :min="betAmount"
  :max="currentPlayer.stack"
  ></v-slider>

  <!-- v-if="lastBet > betAmount" -->
  <v-btn label="Fold" @click.prevent="next_action({type: 'fold'})">Fold</v-btn>

  <v-btn
  label="knock"
  v-if="toggle"
  @click.prevent="next_action({type: 'knock'})"
  @keyup.75="next_action({type: 'knock'})">
  check</v-btn>

  <v-btn v-else label="follow" @click.prevent="bet(betAmount, 'follow')">Follow</v-btn>

  <v-btn v-if="currentPlayer.stack > lastBet" :value="betAmount" @click.prevent="bet(lastBet)" >Bet</v-btn>
  <v-btn v-if="!currentPlayer.allIn" label="allIn" @click.prevent="bet(currentPlayer.stack, 'AllIn')">AllIn</v-btn>

   <br/>
   <br/>

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
  watch: {
    cards: function(value) {
      this.lastBet = this.smallBlind;
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
      if (x) this.lastBet = this.bigBlind;
      return x;
    }
  },
  methods: {
    ...mapActions(['next_action', 'update_amount']),
    bet: function(e, type = 'bet') {
      console.log('type', type);
      console.log('e', e);
      if (type == 'AllIn' || e >= this.currentPlayer.stack) {
        type = 'bet';
        this.$store.dispatch('all_in');
      }
      this.$store.dispatch('update_amount', e);
      this.$store.dispatch('next_action', { type: type, amount: e });
    }
  }
};
</script>

<style>
.debug{
border: 5px solid black;
margin-bottom: 100px;
}

.sliderDesign {
  /*background-color: #cccccc !important;*/
  box-shadow: 1px;
    /*background: red;*/
}
</style>
