<template>
<div>
    <v-dialog v-model="toggleShit">
      <v-card>
        <p>
          {{cards}}
          CHOOSE WINNER
        </p>
       <v-btn @click.stop="toggleShit=!toggleShit">Bet</v-btn>
     </v-card>
     </v-dialog>
</div>
</template>

<script>
// import { mapGetters, mapMutations } from 'vuex';

export default {
  props: ['cards'],
  name: 'chooseWinner',

  data: function() {
    return {};
  },
  computed: {
    toggleShit: {
      get: function() {
        return this.cards === 5;
      },
      set: function() {
        console.log('no set needed', this.toggleShit);
      }
    }
  },
  components: {},
  methods: {
    toggleFalse: function() {
      this.toggleShit = false;
    }
  }
};
</script>

<style>

</style>
