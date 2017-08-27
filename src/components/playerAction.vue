<template>
<div>
  <v-btn label="Fold" @click.prevent="next_action({type: 'fold'})">Fold</v-btn>
  <v-btn
  label="knock"
  v-if="!playerBets.length"
  @click.prevent="next_action({type: 'knock'})"
  @keyup.75="next_action({type: 'knock'})">
  check</v-btn>
  <v-btn v-else label="follow" @click.prevent="next_action({type: 'follow'})">Follow</v-btn>
  <v-btn label="Raise" @click.stop="dialog=!dialog">Raise</v-btn>
<raiseDialog :dialog="dialog" @closeDialog="dialog=!dialog"></raiseDialog>

</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'playerAction',

  data: function() {
    return {
      dialog: false
    };
  },
  computed: {
    ...mapGetters(['playerBets'])
  },
  methods: {
    ...mapActions(['next_action'])
  },
  components: {
    raiseDialog: require('./raiseDialog.vue')
  }
};
</script>

<style>

</style>
