//TODO
// Implements small and big Blind [when cards 0 remove money blabla]

<template>
  <div>
<v-container class="choices">
  <gameInfos></gameInfos>
    <v-btn label="Fold" @click.prevent="next_player({type: 'fold'})">Fold</v-btn>
    <v-btn label="Knock" @click.prevent="next_player({type: 'knock'})" @keyup.75="next_player({type: 'knock'})">Knock</v-btn>
    <v-btn label="Follow" @click.prevent="next_player({type: 'follow'})">Follow</v-btn>
    <v-btn label="Raise" @click.stop="dialog=!dialog">Raise</v-btn>
    <v-btn label="AllIn" @click.prevent="next_player({type: 'allIn'})">All-In</v-btn>
<raiseDialog :dialog="dialog" @closeDialog="dialog=!dialog"></raiseDialog>
<playerStack></playerStack>
</v-container>
<pokerTable></pokerTable>
<!-- <chooseWinner :cards="cards" :timing="currentPlayerPosition === playersInHand - 1"></chooseWinner> -->

</div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
export default {
  name: 'play',
  beforeMount: function() {
    this.$store.commit('setPlayersStack');
    this.$store.dispatch('playersInHand');
  },
  data: function() {
    return {
      dialog: false
    };
  },
  computed: {
    ...mapGetters([
      'players',
      'dealer',
      'currentPlayer',
      'currentPlayerPosition',
      'playersInHand',
      'betAmount',
      'stack',
      'cards'
    ]),
    dealerChip: function() {
      return this.players[this.dealer];
    }
  },
  methods: {
    ...mapActions(['next_player', 'bet_amount'])
  },
  components: {
    playerStack: require('./playerStack.vue'),
    raiseDialog: require('./raiseDialog.vue'),
    pokerTable: require('./pokerTable.vue'),
    gameInfos: require('./gameInfos.vue'),
    chooseWinner: require('./chooseWinner.vue')
  }
};
</script>

<style>
.choices {
  margin: 2%;
  display: inline-block;
  min-width: 360px;
  width: 100%;
}
</style>
