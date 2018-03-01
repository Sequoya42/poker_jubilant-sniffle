<template>
<div class="game">
  <v-container>
    <v-text-field label="Money Stack"
      type="number"
      min="10"
      max="50000"
      :value="stack"
      @input="setStack"
      prepend-icon="account_balance"></v-text-field>
    <v-text-field label="People"
      type="number"
      min="2"
      max="5"
      :value="nPlayers"
      @input="setPlayers"
      prepend-icon="people"></v-text-field>
    <v-text-field label="small Blind"
      min="1"
      max="1000"
      type="number"
      :value="smallBlind"
      @input="setSmallBlind"
      prepend-icon="attach_money"></v-text-field>
    <v-text-field label="big Blind"
      :value="bigBlind"
      prepend-icon="attach_money"
      disabled></v-text-field>
  </v-container>

  <div v-if="nPlayers > 1"
    id="players">
    <playerSettings></playerSettings>
  </div>

  <v-container>
    <router-link :to="{name: 'Game'}">
      <v-btn>
        Start Game
      </v-btn>
    </router-link>
  </v-container>

</div>
</template>

<script>
import playerSettings from './playerSettings.vue';
import {
  mapGetters,
  mapMutations
} from 'vuex';

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
  watch: {
    smallBlind() {
      if (this.smallBlind >= this.stack / 2)
        this.setStack(this.stack * 3);
    }
  },
  components: {
    playerSettings
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#players {
  width: 30%;
  padding-top: 5%;
  display: inline-flex;
}


.game {
  width: 80%;
  padding-top: 5%;
  display: inline-block;
}
</style>
