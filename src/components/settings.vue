<template>
  <div class="game">
<v-container>
<v-text-field
  label="Money Stack"
  type="number"
  :value="stack"
  @input="setStack"
  prepend-icon="money"
></v-text-field>
<v-text-field
  label="People"
  type="number"
  :value="nPlayers"
  @input="setPlayers"
  prepend-icon="people"
></v-text-field>
<v-text-field
  label="small Blind"
  min="1"
  max="1000"
  type="number"
  :value="smallBlind"
  @input="setSmallBlind"
  prepend-icon="attach_money"
></v-text-field>
<v-text-field
  label="big Blind"
  min="2"
  max="2000"
  type="number"
  :value="bigBlind"
  @input="setBigBlind"
  prepend-icon="attach_money"
></v-text-field>
</v-container>

<div v-if="nPlayers > 1" id="players">
  <playerSettings></playerSettings>
</div>

<v-layout>
  <router-link :to="{name: 'Game'}">
  <span @click="setPlayersStack">
    Start Game
  </span>
  </router-link>
</v-layout>

</div>

</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
  name: 'settings',
  computed: {
    ...mapGetters(['smallBlind', 'bigBlind', 'stack', 'nPlayers'])
  },
  methods: {
    ...mapMutations([
      'setBigBlind',
      'setSmallBlind',
      'setStack',
      'setPlayers',
      'setPlayersStack'
    ])
  },
  components: {
    playerSettings: require('./playerSettings.vue')
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
