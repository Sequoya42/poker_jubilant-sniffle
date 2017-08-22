<template>
<div>
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
