<template>
<v-flex :style="orderPlayer">
  <span class="name">
    {{player.name}}
</span>
  <br />
  <span class="stack"
    :class="{allIn: player.allIn}">
	  {{player.lost ? "finished" : player.allIn ? "ALL IN" : player.stack}}
  </span>
  <v-icon v-if="index === dealer">people</v-icon>
  <v-icon v-if="player.folded">visibility_off</v-icon>
  <span v-if="player.bet"
    class="pot"> <b>{{player.bet}}</b> </span>
</v-flex>
</template>

<script>
import {
  mapGetters,
  mapMutations
} from 'vuex';

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
        borderRadius: '25%',
        backgroundColor: this.player.lost ?
          'rgb(42, 23, 38)' : this.player.folded ?
          '#A53860' : this.index === this.currentPlayerPos ?
          'rgb(22, 166, 149)' : '#2D4571',
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
  display: inline-block;
  height: 100px;
  padding: 10px;
  border: 1px solid black;
  border-radius: 4px;
  background-color: rgb(81, 129, 76);
}

.myDealer {
  width: 22px;
  height: 22px;
  background-color: #749728;
}

.name {
  color: white;
  width: 100%;
  font-weight: 900;
}

.stack {
  color: white;
  font-weight: 900;
}

.allIn {
  color: red;
}

.pot {
  text-align: center;
  background-color: hsla(64, 71%, 61%, 0.7);
  color: black;
  padding: 9px;
  border: 4px solid #ffc107 !important;
  border-radius: 50%;
  margin-top: 70%;
}
</style>
