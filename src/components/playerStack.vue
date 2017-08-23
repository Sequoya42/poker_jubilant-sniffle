<template>
<div>
  <v-data-table
  :headers="headers"
  :items="players"
  hide-actions
  >

  <template slot="items" scope="props">
    <!-- <v-icon>eur</v-icon> -->
       <td class="text-xs-left">{{ props.item.name }}</td>
       <td class="text-xs-right">{{ props.item.stack }}</td>
       <td class="text-xs-right">
         <v-icon v-if="dealer === props.item.name" label="ni">
           donut_small
         </v-icon>
       </td>
     </template>
  </v-data-table>
</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'playerStack',
  props: ['dealer'],
  data: function() {
    return {
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
        },
        {
          text: 'dealer',
          value: 'dealer'
        }
      ]
    };
  },
  components: {},
  computed: {
    ...mapGetters(['players'])
  },
  methods: {}
};
</script>

<style>

</style>
