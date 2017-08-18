<template>
  <div class="game">
    <form novalidate @submit.stop.prevent="submit">
  <md-input-container>
    <md-icon>euro_symbol</md-icon>
    <label>Money stack</label>
    <md-input :value="stack" @input="setStack" type="number"></md-input>
    <md-icon>attach_money</md-icon>
  </md-input-container>

  <md-input-container>
    <md-icon>people</md-icon>
    <label>Number of players</label>
      <md-input :value="nPlayers" @input="setPlayers" type="number" min=2 max=5> </md-input>
  </md-input-container>

  <md-input-container>
    <md-icon>done</md-icon>
    <label>Small blind</label>
    <md-input :value="smallBlind" @input="setSmallBlind" type="number"></md-input>
  </md-input-container>


  <md-input-container>
    <md-icon>done_all</md-icon>
    <label>Big blind</label>
    <md-input :value="bigBlind" @input="setBigBlind" type="number"></md-input>
  </md-input-container>
</form>
<div v-if="nPlayers > 1" id="players">
<namedPlayers></namedPlayers>
</div>
<md-layout md-align="center">
  <router-link :to="{name: 'Home'}" tag="md-button" class="md-raised md-primary">Start game</router-link>
</md-layout>

</div>

</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
  name: 'game',
  computed: {
    ...mapGetters(['smallBlind', 'bigBlind', 'stack', 'nPlayers'])
  },
  methods: {
    ...mapMutations(['setBigBlind', 'setSmallBlind', 'setStack', 'setPlayers'])
  },
  components: {
    namedPlayers: require('./namedPlayers.vue')
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
#players {
  width: 30%;
  padding-top: 5%;
  display: inline-flex;
  /*align: center;*/
}

.game {
  width:80%;
  padding-top: 5%;
  display: inline-block;
}

</style>
