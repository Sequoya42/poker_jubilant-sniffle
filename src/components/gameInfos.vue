<template>
<v-flex>
  <v-data-table
  :headers="headers"
  :items="[1]"
  hide-actions
  >

    <template slot="items" slot-scope="props">

    <!-- <v-icon>eur</v-icon> -->
       <td >{{ cards }}</td>
       <td class="text-xs-right">{{ players[0].name }}</td>
       <td class="text-xs-right">{{ currentPlayer.name }}</td>
       <td class="text-xs-right">{{playersInHand}} </td>
       <td  v-model="betAmount" class="text-xs-right">{{ betAmount }}</td>
     </template>
  </v-data-table>
</v-flex>
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
      'playersInHand'
    ])
  },
  methods: {}
};
</script>

<style>

</style>
