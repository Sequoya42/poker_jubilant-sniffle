<template>
  <div >
  <popup :winner="oneWin"></popup>
    <!-- {{reset}} -->
    <pokerTable></pokerTable>
<v-container class="choices">
  <!-- <gameInfos></gameInfos> -->
  <resetGame v-if="reset"></resetGame>

  <playerAction v-else-if="!end"></playerAction>

  <chooseWinner v-else></chooseWinner>
</v-container>
<div>

</div>
<!-- //TODO ******** ********  move list action to a side panel  ******** ******** -->
<listActions></listActions>

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
  methods: {},
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
border-radius: 22%;
  margin: 2%;
  display: inline-block;
  min-width: 360px;
  width: 60%;
}


</style>
