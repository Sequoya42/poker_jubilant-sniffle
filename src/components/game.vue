<template>
<div id="choices">

<h4>
  {{currentPlayer.name}} to play:
</h4>
  <div>
    <v-btn label="Fold" @click.prevent="next_player({type: 'fold'})">Fold</v-btn>
    <v-btn label="Knock" @click.prevent="next_player({type: 'knock'})">Knock</v-btn>
    <v-btn label="Follow" @click.prevent="next_player({type: 'follow'})">Follow</v-btn>
    <v-btn label="Raise" @click.stop="dialog=true">Raise</v-btn>
<div>
  "AMOUNT TO BET " {{betAmount}}
</div>
<v-dialog  v-model="dialog">
  <v-card id="ledialog">
    <v-text-field :value="betAmount" @input="bet_amount" type="number"></v-text-field>
   <v-slider label="Bet"  :max="stack" :value="betAmount" @input="bet_amount"></v-slider>
   <v-btn @click.prevent="next_player({type: 'raise'})" @click.stop="dialog=false">Bet</v-btn>
 </v-card>
 </v-dialog>
</div>

<br />

<v-data-table
:headers="headers"
:items="players"
hide-actions
>
<template slot="items" scope="props">
     <td class="text-xs-left">{{ props.item.name }}</td>
     <td class="text-xs-right">{{ props.item.stack}}</td>
   </template>
</v-data-table>
</div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'play',
  data: function() {
    return {
      dialog: false,
      headers: [
        {
          text: 'name',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        {
          text: 'stack',
          value: 'stack'
        }
      ]
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
#ledialog {
  margin: 4px;
  padding: 8px;
}
</style>
