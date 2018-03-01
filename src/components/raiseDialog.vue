<template>
<div v-if="realDialog">
  <v-dialog v-model="realDialog">
    <v-card id="ledialog">
      <div>
        {{lastBet || 1}}
      </div>
      <v-text-field autofocus
        :value="betAmount"
        :min="lastBet"
        :step="smallBlind"
        :max="currentPlayer.stack"
        @input="update_amount"
        @keyup.enter.stop="realDialog=!realDialog"
        @keyup.enter.prevent="bet"
        type="number"></v-text-field>

      <v-slider label="Bet"
        :value="betAmount"
        :min="lastBet"
        :step="smallBlind"
        :max="currentPlayer.stack"
        @input="update_amount"></v-slider>
      <v-btn @click.prevent="bet"
        @click.stop="realDialog=!realDialog">Bet</v-btn>
    </v-card>
  </v-dialog>
</div>
</template>

<script>
import {
  mapGetters,
  mapMutations,
  mapActions
} from 'vuex';

export default {
  props: ['dialog'],
  name: 'raiseDialog',
  data: function() {
    return {
      lastBet: this.$store.state.game.betAmount
    };
  },
  computed: {
    ...mapGetters(['betAmount', 'currentPlayer', 'smallBlind', 'lastOne']),
    realDialog: {
      get: function() {
        return this.dialog;
      },
      set: function() {
        this.$emit('closeDialog');
      }
    }
  },
  methods: {
    ...mapActions(['next_action', 'update_amount']),
    bet: function() {
      this.lastBet = this.betAmount;
      this.next_action({
        type: 'bet'
      });
    }
  }
};
</script>

<style>
#ledialog {
  margin: 4px;
  padding: 8px;
}
</style>
