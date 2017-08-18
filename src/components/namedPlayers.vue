<template>
  <div>
    <draggable v-model='players'>
    <md-list v-for="p in players" :key='p.id'>
      <md-list-item>
        <md-input-container>
        <md-icon>people</md-icon>
        <label>name</label>
        <md-input :value="p.name"  type="text"> </md-input>
      </md-input-container>
      </md-list-item>
    </md-list>
    <!-- <li v-for="p in players"> -->
  </draggable>

    <!-- </li> -->
    <div @dragover.prevent height=50px>
      drop here
    </div>

  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import draggable from 'vuedraggable';

export default {
  name: 'namedPlayers',
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
    // ...mapGetters(['players'])
  },
  methods: {
    ...mapMutations(['setPlayers'])
  }
  // components: {
  //   namedPlayers: require('./namedPlayers')
  // }
};
</script>

<style>

</style>
