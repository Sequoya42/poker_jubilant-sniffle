<template>
<div class="mainDiv" :style="orderPlayer">
  <div class="name">
    {{player.name}}
  </div>
  <div class="stack">
    {{player.stack}}
  </div>
  <div v-if="index === dealer">
    <v-icon>people</v-icon>
  </div>
</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  props: ['player', 'index'],
  name: 'playerFace',
  components: {},
  computed: {
    ...mapGetters(['nPlayers', 'currentPlayerPosition', 'dealer']),
    orderPlayer: function() {
      let step = Math.PI * 2 / this.nPlayers;
      let p = step * this.index + Math.PI * 2 / 12;
      let leftPos = `${Math.cos(p) * 276 + 450 - 35}px`;
      let topPos = ` ${Math.sin(p) * 150 + 300 - 50}px`;
      return {
        position: 'absolute',
        backgroundColor:
          this.index === this.currentPlayerPosition ? '#D80B00' : '#AA0800',
        top: topPos,
        left: leftPos
      };
    },
    playerOrder: function() {
      if (this.index === 0) {
        return 'playerOne';
      } else if (this.index === 1) {
        return 'playerTwo';
      } else if (this.index === 2) {
        return 'playerThree';
      } else if (this.index === 3) {
        return 'playerFour';
      } else if (this.index === 4) {
        return 'playerFive';
      }
    }
  },
  methods: {}
};
</script>

<style>
.mainDiv {
  display          : inline-block;
  height           : 100px;
  padding          : 10px;
  border           : 1px solid black;
  border-radius    : 4px;
  background-color : rgb(81, 129, 76);
}

.myDealer {
  width            : 22px;
  height           : 22px;
  background-color : #749728;
}

.name {
  color       : white;
  font-weight : 900;
  line-height : 2;
}

.stack {
  color       : white;
  font-weight : 900;
  line-height : 2;
}

.playerOne {
  /* background-color: orange; */
  order : 1;
}

.playerTwo {
  /* background-color: red; */
  order : 3;
}
</style>
