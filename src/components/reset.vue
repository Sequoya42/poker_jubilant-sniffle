<template>
  <v-layout>
    Game over !
    <v-btn @click="reset_game">Play again</v-btn>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'resetGame',

  methods: {
    ...mapActions(['reset_game'])
  }
};
</script>

<style>

</style>
