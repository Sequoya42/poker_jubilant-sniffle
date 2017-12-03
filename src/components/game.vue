<template>
  <v-content>
	  <listActions></listActions>
  <popup :winner="oneWin"></popup>
    <!-- {{reset}} -->
    <pokerTable></pokerTable>
<v-container class="choices">
  <!-- <gameInfos></gameInfos> -->
  <resetGame v-if="reset"></resetGame>

  <playerAction v-else-if="!end"></playerAction>

  <chooseWinner v-else></chooseWinner>
</v-container>

</v-content>
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
      drawer: true,
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
    playerStack: () => import('./playerStack.vue'),
    pokerTable: () => import('./pokerTable.vue'),
    gameInfos: () => import('./gameInfos.vue'),
    chooseWinner: () => import('./chooseWinner.vue'),
    playerAction: () => import('./playerAction'),
    resetGame: () => import('./reset'),
    listActions: () => import('./listActions'),
    popup: () => import('./popup')
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

/*
TODO
vh vw, virtual bail magie putot que %

*/
</style>
