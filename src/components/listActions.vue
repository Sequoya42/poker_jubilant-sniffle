<template>
<div class="vador" v-scrollBar >
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
  directives: {
    scrollBar: {
      update: function(el, value) {
        el.scrollTop = el.scrollHeight;
      }
    }
  },
  methods: {},
  components: {}
};
</script>

<style>

.vador {
    display: block;
    position: relative;
    height: 100px;
    overflow: scroll;
}

</style>
