<template>
<div class="mainDiv" :style="orderPlayer">
  <div class="name">
    {{player.name}}
  </div>
  <div class="stack">
    {{player.stack}}
  </div>
  {{player.folded}}
    <v-icon v-if="index === dealer">people</v-icon>
    <v-icon v-if="player.folded">visibility_off</v-icon>
</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  props: ['player', 'index'],
  name: 'playerCard',
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
        backgroundColor: this.player.folded
          ? '#3D1255'
          : this.index === this.currentPlayerPosition ? '#D80B00' : '#AA0800',
        top: topPos,
        left: leftPos
      };
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
</style>
