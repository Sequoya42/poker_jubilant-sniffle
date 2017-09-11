<template>
<div>
  <v-card v-for="(action, index) in listActions" :key="index">
  <v-flex>{{action}}</v-flex>
</v-card>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'listActions',

  data: function() {
    return {};
  },
  computed: {
    ...mapGetters(['listActions'])
  },
  methods: {},
  components: {}
};
</script>

<style>

</style>
