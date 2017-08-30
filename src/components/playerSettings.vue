<template>
  <div>
    <h4>Players names</h4>
    <draggable v-model='players'>
    <div v-for="(p, index) in players" :key='index'>
        <v-text-field
        type="text"
        :value="p.name"
        @input="change_name({$event, index})"
        ></v-text-field>
  </div>
  </draggable>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import draggable from 'vuedraggable';

export default {
  name: 'playerSettings',
  components: {
    draggable
  },

  computed: {
    players: {
      get() {
        return this.$store.getters.players;
      },
      set(value) {
        this.$store.commit('updatePlayersOrders', value);
      }
    }
  },
  methods: {
    ...mapActions(['change_name'])
  }
};
</script>

<style>

</style>
