<template>
<div>
  <v-dialog  v-model="realDialog">
    <v-card id="ledialog">
      <p>
        {{dialog}}
        {{realDialog}}
      </p>
      <v-text-field :value="betAmount" @input="bet_amount" type="number"></v-text-field>
     <v-slider label="Bet"  :max="currentPlayer.stack" :value="betAmount" @input="bet_amount"></v-slider>
     <v-btn @click.prevent="next_action({type: 'raise'})" @click.stop="realDialog=!realDialog">Bet</v-btn>
   </v-card>
   </v-dialog>
</div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  props: ['dialog'],
  name: 'raiseDialog',
  computed: {
    ...mapGetters(['betAmount', 'currentPlayer']),
    realDialog: {
      get: function() {
        return this.dialog;
      },
      set: function() {
        console.log('this', this.dialog, this.realDialog);
        this.$emit('closeDialog');
      }
    }
  },
  methods: {
    ...mapActions(['next_action', 'bet_amount'])
  }
};
</script>

<style>
#ledialog {
  margin: 4px;
  padding: 8px;
}
</style>
