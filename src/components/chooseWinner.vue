<template>
  <div class="visible">

    <h6>Choose winner</h6>
<div v-for="player in players">
  <v-btn @click="reset">
    {{player.name}}
  </v-btn>
</div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  props: ['cards', 'timing'],
  name: 'chooseWinner',

  data: function() {
    return {};
  },
  computed: {
    ...mapGetters(['players']),
    toggleShit: {
      get: function() {
        console.log('this.cards', this.cards);
        console.log('this.timing', this.timing);
        return this.cards === 5 && this.timing;
      },
      set: function() {
        console.log('no set needed', this.toggleShit);
      }
    }
  },
  methods: {
    ...mapActions(['reset'])
  },
  components: {}
};
</script>

<style>

.visible {
  border: 1px solid;
  margin: 22px;
  padding: 22px;
  border-radius: 10px;
}
</style>

<!-- <v-dialog v-model="toggleShit">
  <v-card>
    <p>
      {{cards}}
      CHOOSE WINNER
    </p>
   <v-btn @click.native.stop="toggleShit=!toggleShit">Bet</v-btn>
 </v-card>
 </v-dialog> -->
