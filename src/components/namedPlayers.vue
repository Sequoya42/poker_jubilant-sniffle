<template>
  <div>
    <md-list v-for="p in players" :key='p.id'>
      <md-list-item>
        <md-input-container>
        <md-icon>people</md-icon>
        <label>name</label>
        <md-input :value="p"  type="text"> </md-input>
      </md-input-container>
      </md-list-item>
    </md-list>
    <!-- <li v-for="p in players"> -->

    <!-- </li> -->

  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
  name: 'namedPlayers',
  computed: {
    ...mapGetters(['players'])
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
