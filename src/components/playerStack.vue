<template>
<div>
  <v-data-table
  :headers="headers"
  :items="players"
  hide-actions
  >

  <template  slot="items" scope="props">
    <!-- <tr :class="{folded: props.item.folded}"> -->
       <td   class="text-xs-left">{{ props.item.name }}</td>
       <td class="text-xs-right">{{ props.item.stack }}</td>
       <td class="text-xs-right">
         <v-icon v-if="players[0] === props.item" label="ni">
           donut_small
       </v-icon>
       </td>
     <!-- </tr> -->
     </template>
  </v-data-table>
</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'playerStack',
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
.folded {
  background-color: #3D1255;
  color: white;
}
</style>
