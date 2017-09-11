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
  updated() {
    var elem = this.$el;
    elem.scrollTop = elem.clientHeight;
  },
  computed: {
    ...mapGetters(['listActions'])
  },
  directives: {
    scrollBar: {
      bind: function(el) {
        console.log('el', el.scrollTop);
        console.log(el.style.Height);
        el.scrollTop = el.scrollHeight;
        console.log('el', el.scrollHeight);
      },
      update: function(el, nel) {
        el.scrollTop = nel.scrollHeight;
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
