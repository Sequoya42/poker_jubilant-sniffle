<template>
<v-chip  :style="orderPlayer">
  <div class="name">
    {{player.name}}
  </div>
  <div class="stack">
    {{player.stack}}
  </div>
  <!--  game.js in function clearHand : we reorder the array of players, dealer always on top -->
    <v-icon v-if="index === dealer">people</v-icon>
    <v-icon v-if="player.folded">visibility_off</v-icon>
</v-chip>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  props: ['player', 'index'],
  name: 'playerCard',
  components: {},
  computed: {
    ...mapGetters(['dealer', 'nPlayers', 'currentPlayerPos']),
    orderPlayer: function() {
      let step = Math.PI * 2 / this.nPlayers;
      let p = step * this.index + Math.PI * 2 / 12;
      let leftPos = `${Math.cos(p) * 276 + 450 - 35}px`;
      let topPos = ` ${Math.sin(p) * 150 + 150 - 50}px`;
      return {
        position: 'absolute',
        flexDirection: 'column',
        // background: 'linear-gradient(120deg, rgb(215, 188, 41), green)',
        border: 'solid 1.5px rgb(25, 24, 52)',
        height: '60px',
        backgroundColor: this.player.folded
          ? '#3D1255'
          : this.index === this.currentPlayerPos ? '#2D4571' : '#2D4571',
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
  width: 100%;
  font-weight : 900;
  line-height : 2;
}

.stack {
  color       : white;
  font-weight : 900;
  line-height : 2;
}
</style>
