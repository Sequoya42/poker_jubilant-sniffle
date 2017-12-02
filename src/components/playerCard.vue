<template>
<v-flex  :style="orderPlayer">
  <span class="name">
    {{player.name}}
</span>
<br />
  <span class="stack" :class="{allIn: player.allIn}">
	  {{player.lost ? "finished" : player.allIn ? "ALL IN" : player.stack}}
  </span>
    <v-icon v-if="index === dealer">people</v-icon>
    <v-icon v-if="player.folded">visibility_off</v-icon>
    <span  v-if="player.bet" class="pot"> {{player.bet}} </span>
</v-flex>
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
        // border: 'solid 1.5px rgb(25, 24, 52)',
        borderRadius: '25%',
        backgroundColor: this.player.lost
          ? 'rgb(42, 23, 38)'
          : this.player.folded
            ? '#A53860'
            : this.index === this.currentPlayerPos
              ? 'rgb(22, 166, 149)'
              : '#2D4571',
        top: topPos,
        left: leftPos
      };
    }
  },
  methods: {}
};
</script>

<style scoped>
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
  /*line-height : 2;*/
}

.stack {
  color       : white;
  font-weight : 900;
  /*line-height : 2;*/
}

.allIn {
    color : red;
}

.pot{
text-align: center;
/*margin-left: -100%;*/
padding: 9px;
border: 4px solid #ffc107 !important;
margin-top: 70%;
/*position: relative;*/
/*width: auto;*/
/*text-align: center;*/
}
</style>
