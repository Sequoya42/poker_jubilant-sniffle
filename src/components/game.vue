<template>
<v-container fluid>
  <listActions></listActions>
  <popup :winner="oneWin"></popup>
  <pokerTable></pokerTable>

  <v-container class="choices">
    <resetGame v-if="reset"></resetGame>
    <playerAction v-else-if="!end"></playerAction>
    <chooseWinner v-else></chooseWinner>
  </v-container>

</v-container>
</template>
<script>
import {
  mapGetters,
  mapMutations,
  mapActions
} from 'vuex';
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
      console.log('Changed', this.oneWin)
      this.snackbar = this.oneWin;
    }
  },
  computed: {
    ...mapGetters(['end', 'players', 'reset', 'separatePot', 'oneWin'])
  },
  methods: {},
  components: {
    playerStack: () =>
      import ('./playerStack.vue'),
    pokerTable: () =>
      import ('./pokerTable.vue'),
    chooseWinner: () =>
      import ('./chooseWinner.vue'),
    playerAction: () =>
      import ('./playerAction'),
    resetGame: () =>
      import ('./reset'),
    listActions: () =>
      import ('./listActions'),
    popup: () =>
      import ('./popup')
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
