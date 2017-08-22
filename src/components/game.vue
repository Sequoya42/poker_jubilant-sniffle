<template>
<div id="choices">

<h4>
  {{currentPlayer.name}} to play:
</h4>
  <div>
    <v-btn label="Fold" @click.prevent="next_player({type: 'fold'})">Fold</v-btn>
    <v-btn label="Knock" @click.prevent="next_player({type: 'knock'})">Knock</v-btn>
    <v-btn label="Follow" @click.prevent="next_player({type: 'follow'})">Follow</v-btn>
    <v-btn label="Raise" @click.stop="dialog=!dialog">Raise</v-btn>
<div>
  "AMOUNT TO BET " {{betAmount}}
  {{dialog}}
</div>

</div>
<raiseDialog :dialog="dialog" @closeDialog="dialog=!dialog"></raiseDialog>

<br />

<playerStack></playerStack>
</div>


</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'play',
  data: function() {
    return {
      dialog: false
    };
  },
  computed: {
    ...mapGetters(['players', 'dealer', 'currentPlayer', 'betAmount', 'stack'])
  },
  methods: {
    ...mapActions(['next_player', 'bet_amount'])
  },
  components: {
    playerStack: require('./playerStack.vue'),
    raiseDialog: require('./raiseDialog.vue')
  }
};
</script>

<style>
#choices {
  margin: 2%;
  display: inline-block;
}

</style>
