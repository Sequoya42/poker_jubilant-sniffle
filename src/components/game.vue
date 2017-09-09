<template>
  <div >
  <popup :winner="oneWin"></popup>
    <!-- {{reset}} -->
    <pokerTable class="topSpace"></pokerTable>
<v-container class="choices">
  <!-- <gameInfos></gameInfos> -->
  <resetGame v-if="reset"></resetGame>

  <playerAction v-else-if="!end"></playerAction>

  <chooseWinner v-else></chooseWinner>
</v-container>

<listActions></listActions>
<v-flex :value="separatePot">
  {{separatePot}}
</v-flex>

</div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
export default {
  name: 'play',
  beforeMount: function() {
    this.$store.commit('setPlayersStack');
    this.$store.commit('playerOneDeals');
    this.$store.dispatch('new_hand');
  },
  data: function() {
    return {
      showStack: true,
      snackbar: false
    };
  },
  watch: {
    oneWin: function() {
      this.snackbar = this.oneWin;
    }
  },
  computed: {
    ...mapGetters(['end', 'players', 'reset', 'separatePot', 'oneWin'])
  },
  methods: {
    // ...mapActions([])
  },
  components: {
    playerStack: require('./playerStack.vue'),
    pokerTable: require('./pokerTable.vue'),
    gameInfos: require('./gameInfos.vue'),
    chooseWinner: require('./chooseWinner.vue'),
    playerAction: require('./playerAction'),
    resetGame: require('./reset'),
    listActions: require('./listActions'),
    popup: require('./popup')
  }
};
</script>

<style>
.choices {
  /*border-style:none;*/
  /*box-shadow: 4px 2px 10px rgba(0, 0, 0, .5) inset;*/
  /*border: 1px solid blck;*/
  /*padding: 4%;*/
border-radius: 22%;
  margin: 2%;
  display: inline-block;
  min-width: 360px;
  width: 60%;
}

  .topSpace {
    /*margin-top: 100px !important;*/
}

</style>

// TODO
/*

transition effect change buttons


// ******** ********    ******** ********

separate pot when multiple all in with different values
a way to choose order of winners

put color folded before choose winner when only one player left

refactor !

css

ui

find atom package to order object property by name

*/
