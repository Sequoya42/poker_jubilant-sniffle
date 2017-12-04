<template>
  <v-container class="pink">
	  <listActions class="hidden-sm-and-down"></listActions>
  <popup :winner="oneWin"></popup>
    <pokerTable></pokerTable>

<v-container class="blue">
	<v-flex>
  <resetGame v-if="reset"></resetGame>
  <playerAction v-else-if="!end"></playerAction>
  <chooseWinner v-else></chooseWinner>
</v-flex>
</v-container>

</v-container>
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
</style>
