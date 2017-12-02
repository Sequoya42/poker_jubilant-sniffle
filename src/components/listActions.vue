<template>
	<v-navigation-drawer absolute clipped permanent dark v-model="drawer">
  <v-flex v-for="(action, index) in listActions" :key="index">
	<v-card>
	  <v-card-text class="px-0" :style="chooseColor(action, index)">
	  {{action}}
  </v-card-text>
</v-card>

</v-flex>
</v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

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
    scrollBar: {
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
        ret.backgroundColor = '#710e0e';
      }
      if (action.indexOf('bet') !== -1) {
        ret.color = '#DDAE7E';
      } else if (action.indexOf('fold') !== -1) {
        ret.color = '#99B0BE';
      } else if (action.indexOf('allIn') !== -1) {
        ret.color = '#A8201A';
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
  },
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
