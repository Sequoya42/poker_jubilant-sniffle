<template>
<div v-model="winners"
  class="visible">
  <h6>Choose winner(s) </h6>
  <div v-for="(player, index) in players"
    :key="player.folded">
    <v-btn :class="clicked(index)"
      v-if="canWin(player, index)"
      @click="addWinner(index)"> {{player.name}} </v-btn>
  </div>
  <v-btn @click="chooseWinner">submit winner</v-btn>
</div>
</template>

<script>
import {
  mapGetters,
  mapActions,
  mapMutations
} from 'vuex';

export default {
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
    ...mapActions(['chooseWinner', 'getMoneyBack']),
    ...mapMutations(['addWinner']),
    clicked: function(index) {
      return {
        clicked: this.winners.includes(index)
      };
    },
    canWin: function(player, index) {
      if (player.folded) return false;
      if (this.separatePot[index] === 0) return false;
      return true;
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
  background-color: rgb(81, 129, 76) !important;
}
</style>
