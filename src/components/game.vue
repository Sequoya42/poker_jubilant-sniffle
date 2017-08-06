<template>
  <div class="game">
    <form novalidate @submit.stop.prevent="submit">
  <md-input-container>
    <md-icon>euro_symbol</md-icon>
    <label>Money stack</label>
    <md-input :value="stack" @input="setStack" type="text"></md-input>
    <md-icon>attach_money</md-icon>
  </md-input-container>

  <md-input-container>
    <md-icon>people</md-icon>
    <label>Number of players</label>
    <md-input :value="nPlayers" @input="setMockPlayers" type="text"> </md-input>
  </md-input-container>

  <md-input-container>
    <md-icon>done</md-icon>
    <label>Small blind</label>
    <md-input :value="smallBlind" @input="setSmallBlind" type="text"></md-input>
  </md-input-container>


  <md-input-container>
    <md-icon>done_all</md-icon>
    <label>Big blind</label>
    <md-input :value="bigBlind" @input="setBigBlind" type="text"></md-input>
  </md-input-container>
</form>
<div v-if="nPlayers > 1">
<namedPlayers></namedPlayers>
</div>
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
    ...mapMutations([
      'setBigBlind',
      'setSmallBlind',
      'setStack',
      'setMockPlayers'
    ])
  },
  components: {
    namedPlayers: require('./namedPlayers')
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
</style>
