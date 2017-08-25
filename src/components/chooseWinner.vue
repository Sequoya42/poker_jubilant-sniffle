<template>
<div>
    <v-dialog v-model="toggleShit">
      <v-card>
        <p>
          {{cards}}
          CHOOSE WINNER
        </p>
       <v-btn @click.native.stop="toggleShit=!toggleShit">Bet</v-btn>
     </v-card>
     </v-dialog>
</div>
</template>

<script>
// import { mapGetters, mapMutations } from 'vuex';

export default {
  props: ['cards', 'timing'],
  name: 'chooseWinner',

  data: function() {
    return {};
  },
  computed: {
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
  components: {},
  methods: {}
};
</script>

<style>

</style>
