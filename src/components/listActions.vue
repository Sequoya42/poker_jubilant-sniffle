<template>
<div class="vador" v-scrollBar>
  <v-card  v-for="(action, index) in listActions" :key="index">
  <v-flex :class="{odd: index % 2, even : !(index % 2)}">{{action}}</v-flex>
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

.odd {
  background-color: rgb(151, 181, 232);
}

.even {
  background-color: rgb(160, 224, 178);
}
</style>
