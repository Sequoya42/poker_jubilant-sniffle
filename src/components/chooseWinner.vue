<!-- plugin for validation -->
<template>
  <div v-model="winners" class="visible">
    <h6>Choose winner(s) </h6>
    {{winners}}
    {{separatePot}}
<div v-for="(player, index) in players" :key="player.folded">
  <v-btn :class="clicked(index)" v-if="!player.folded" @click="addWinner(index)"> {{player.name}} </v-btn>
</div>
<v-btn @click="chooseWinner(winners)">submit</v-btn>


</div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  // props: ['players'],
  name: 'chooseWinner',

  data: function() {
    return {
      snackbar: true
    };
  },
  computed: {
    ...mapGetters(['players', 'separatePot', 'winners'])
  },
  methods: {
    ...mapActions(['chooseWinner']),
    ...mapMutations(['addWinner']),
    clicked: function(index) {
      return {
        clicked: this.winners.includes(index)
      };
    }
  },
  components: {}
};
</script>

<style>

.visible {
  border: 1px solid;
  margin: 22px;
  padding: 22px;
  border-radius: 10px;
}

.clicked {
  background-color : rgb(81, 129, 76) !important;
}
</style>

<!-- <v-dialog v-model="toggleShit">
  <v-card>
    <p>
      {{cards}}
      CHOOSE WINNER
    </p>
   <v-btn @click.native.stop="toggleShit=!toggleShit">Bet</v-btn>
 </v-card>
 </v-dialog> -->
