<template>
<v-navigation-drawer mini-variant.sync
  width="200"
  app
  clipped
  floating
  hide-overlay
  fixed
  permanent>
  <v-flex v-for="(action, index) in listActions"
    :key="index">
    <v-card>
      <v-card-text class="px-0"
        :style="chooseColor(action, index)">
        {{action}}
      </v-card-text>
    </v-card>

  </v-flex>
</v-navigation-drawer>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex';

export default {
  name: 'listActions',

  data: function() {
    return {
      drawer: true
    };
  },
  computed: {
    ...mapGetters(['listActions'])
  },
  directives: {
    scrollBar: { //unused
      componentUpdated: function(el, value) {
        el.scrollTop = el.scrollHeight;
      }
    }
  },
  methods: {
    chooseColor: (action, index) => {
      let ret = {};
      if (index % 2) {
        ret.backgroundColor = '#a63838';
      } else {
        ret.backgroundColor = 'rgba(28, 175, 69, 0.62)';
      }
      if (action.indexOf('bet') !== -1) {
        ret.color = '#DDAE7E';
      } else if (action.indexOf('fold') !== -1) {
        ret.color = '#99B0BE';
      } else if (action.indexOf('allIn') !== -1) {
        ret.color = 'rgb(174, 232, 220)';
      } else if (action.indexOf('check') !== -1) {
        ret.color = '#116611';
      }

      if (index % 2) {
        ret.fontWeight = 'bold';
      } else {
        ret.fontWeight = 'normal';
      }
      return ret;
    }
  }
};
</script>

<style>
</style>
