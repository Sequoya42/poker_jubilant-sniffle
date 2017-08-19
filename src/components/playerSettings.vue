<template>
  <div>
    <draggable v-model='players'>
    <md-list v-for="(p, index) in players" :key='p.id'>
      <md-list-item>
        <md-input-container>
        <md-icon>people</md-icon>
        <label>name</label>
        <md-input :value="p.name" @input="change_name({$event, index})" type="text"> </md-input>
      </md-input-container>
      </md-list-item>
    </md-list>
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
    // ...mapGetters(['players'])
  },
  methods: {
    ...mapActions(['change_name'])
  }
  // components: {
  //   playerSettings: require('./playerSettings')
  // }
};
</script>

<style>

</style>
