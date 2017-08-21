<template>
<v-layout id="choices">

<h1>
  {{currentPlayer.name}} to play:
</h1>
  <div>
    <v-btn label="Fold" @click.prevent="next_player({type: 'fold'})">Fold</v-btn>
    <v-btn label="Knock" @click.prevent="next_player({type: 'knock'})">Knock</v-btn>
    <v-btn label="Follow" @click.prevent="next_player({type: 'follow'})">Follow</v-btn>
    <v-btn label="Raise" @click.stop="dialog=true">Raise</v-btn>
<div>
  "AMOUNT TO BET " {{betAmount}}
</div>
<v-dialog v-model="dialog">
  <v-card>
   <v-slider label="Bet"  :max="stack" :value="betAmount" @input="bet_amount"></v-slider>
   <v-text-field :value="betAmount" @input="bet_amount" type="number"></v-text-field>
   <v-btn @click.prevent="next_player({type: 'raise'})" @click.stop="dialog=false">Bet</v-btn>
 </v-card>
 </v-dialog>
</div>

<br />

<div>
  <li v-for="p in players" :key="p.name">
    <ul>
    name:  {{p.name}}
    </ul>
    <ul>

      stack: {{p.stack}}
    </ul>
  </li>
</div>

</v-layout>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'play',
  data: function() {
    return {
      dialog: false
    };
  },

  components: {},
  computed: {
    ...mapGetters(['players', 'dealer', 'currentPlayer', 'betAmount', 'stack'])
  },
  methods: {
    ...mapActions(['next_player', 'bet_amount'])
  }
};
</script>

<style>
#choices {
  margin: 2%;
  display: inline-block;
}
</style>
