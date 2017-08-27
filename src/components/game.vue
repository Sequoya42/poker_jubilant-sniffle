<template>
  <div>

<div>
  {{players}}
</div>

<v-container class="choices">
  <gameInfos></gameInfos>
  <playerAction v-if="!end"></playerAction>

<chooseWinner v-else></chooseWinner>
lastone {{lastOne}}
<v-btn  @click="showStack=!showStack">
  {{showStack ? 'hide infos' : 'show infos' }}
</v-btn>
  <playerStack v-if="showStack" v-model="players"></playerStack>
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
  data: function() {
    return {
      showStack: false
    };
  },
  computed: {
    ...mapGetters(['end', 'players', 'lastOne'])
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
