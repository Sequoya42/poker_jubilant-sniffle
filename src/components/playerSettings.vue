<template>
  <div>
    <draggable v-model='players'>
    <v-list v-for="(p, index) in players" :key='p.id'>
      <v-list-tile>
        <v-text-field
        type="text"
        :value="p.name"
        @input="change_name({$event, index})"
        ></v-text-field>
      </v-list-tile>
  </v-list>
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
        this.$store.commit('updatePlayers', value);
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
