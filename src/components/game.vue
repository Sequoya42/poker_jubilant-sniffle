<template>
  <div >
    <pokerTable class="topSpace"></pokerTable>
<v-container class="choices">
  <!-- <gameInfos></gameInfos> -->
  <playerAction v-if="!end"></playerAction>

<chooseWinner v-else></chooseWinner>
<!--
<v-btn  @click="showStack=!showStack">
  {{showStack ? 'hide infos' : 'show infos' }}
</v-btn>
  <playerStack v-if="showStack" v-model="players"></playerStack> -->
  <!-- <playerStack v-model="players"></playerStack> -->
</v-container>
<!-- <div v-model="players" v-for="player in players">
  <div class="">

    {{player}}
  </div>
</div> -->
<v-flex>
  {{players.map((e, i)=>({[i]: e.bet}))}}
</v-flex>
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
      showStack: true
    };
  },
  computed: {
    ...mapGetters(['end', 'players'])
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

all all in, will freeze.
middle player is okey and wont.

No negative stack

lastone to play, need to be fix when multiple raise

do not rotate players, have a dealer and
dealer = dealer === numberOfPlayers - 1 ? 0 : dealer + 1

// ******** ********    ******** ********

separate pot when multiple all in with different values
a way to choose order of winners

put color folded before choose winner when only one player left

refactor !

css

ui

find atom package to order object property by name

*/
