<template>
  <div>
    <li v-for="p in players">
      {{p}}
    </li>

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
  },
  components: {
    namedPlayers: require('./namedPlayers')
  }
};
</script>

<style>

</style>
