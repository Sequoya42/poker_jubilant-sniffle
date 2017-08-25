<template>
<div id="space">
  <v-data-table
  :headers="headers"
  :items="[1]"
  hide-actions
  >

    <template slot="items" scope="props">

    <!-- <v-icon>eur</v-icon> -->
       <td class="text-xs-left">{{ cards }}</td>
       <td class="text-xs-right">{{ dealer }}</td>
       <td class="text-xs-right">{{ currentPlayer.name }}</td>
       <td class="text-xs-right">{{playersInHand}} </td>
       <td class="text-xs-right">{{ betAmount }}</td>
     </template>
  </v-data-table>
</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'gameInfos',
  data: function() {
    return {
      headers: [
        {
          text: 'Cards',
          align: 'left',
          sortable: false,
          value: 'cards'
        },
        {
          text: 'Dealer',
          value: 'dealer'
        },
        {
          text: 'Current Player',
          value: 'currentPlayer'
        },
        {
          text: 'Player in hand',
          value: 'playerInHands'
        },
        {
          text: 'bet Amount',
          value: 'betAmount'
        }
      ]
    };
  },
  components: {},
  computed: {
    ...mapGetters([
      'players',
      'currentPlayer',
      'betAmount',
      'cards',
      'dealer',
      'playersInHand'
    ])
  },
  methods: {}
};
</script>

<style>
#space{
  overflow: scroll;
  margin-bottom: 10%;
}
</style>
