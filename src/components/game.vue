<template>
  <div>
<v-container class="choices">
  <gameInfos></gameInfos>
  <playerAction v-if="!end"></playerAction>

<chooseWinner v-else></chooseWinner>

<playerStack></playerStack>
</v-container>
<pokerTable></pokerTable>

</div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
export default {
  name: 'play',
  beforeMount: function() {
    this.$store.commit('setPlayersStack');
    this.$store.dispatch('new_hand', 'first');
  },
  computed: {
    ...mapGetters(['end'])
  },
  methods: {
    // ...mapActions([])
  },
  components: {
    playerStack: require('./playerStack.vue'),
    pokerTable: require('./pokerTable.vue'),
    gameInfos: require('./gameInfos.vue'),
    chooseWinner: require('./chooseWinner.vue'),
    playerAction: require('./playerAction')
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
