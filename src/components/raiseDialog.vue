<template>
<div>
  <v-dialog  :value="dialog" @input="realDialog=false">
    <v-card id="ledialog">
      <p>
        {{dialog}}
        {{realDialog}}
      </p>
      <v-text-field :value="betAmount" @input="bet_amount" type="number"></v-text-field>
     <v-slider label="Bet"  :max="stack" :value="betAmount" @input="bet_amount"></v-slider>
     <v-btn @click.prevent="next_player({type: 'raise'})" @click.stop="realDialog=!realDialog">Bet</v-btn>
   </v-card>
   </v-dialog>
</div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  props: ['dialog'],
  name: 'raiseDialog',
  data: function() {
    return {
      realDialog: this.dialog === 'true'
    };
  },
  computed: {
    ...mapGetters(['betAmount', 'stack'])
    // realDialog: {
    //   get: function() {
    //     return this.dialog;
    //   },
    //   set: function() {
    //     console.log('this', this.dialog, this.realDialog);
    //     this.realDialog = false;
    //   }
    // }
  },
  methods: {
    ...mapActions(['next_player', 'bet_amount'])
  }
};
</script>

<style>
#ledialog {
  margin: 4px;
  padding: 8px;
}
</style>
