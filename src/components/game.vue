<template>
<div id="choices">

<h1>
  {{currentPlayer.name}} to play:
</h1>
  <div>
  <md-card>
  <md-card-actions>
    <md-button md-label="Fold" @click="next_player({type: 'fold'})">Fold</md-button>
    <md-button md-label="Knock" @click="next_player({type: 'knock'})">Knock</md-button>
    <md-button md-label="Follow" @click="next_player({type: 'follow'})">Follow</md-button>
    <md-button md-label="Raise" @click="next_player({type: 'raise'})">Raise</md-button>
  </md-card-actions>
</md-card>
</div>

<br />
<div>
<md-card>
<md-table v-for="p in players" :key="p.name">
  <md-table-header>
    <md-table-row>
      <md-table-head>{{p.name}}</md-table-head>
      <md-table-head>{{p.stack}}</md-table-head>
    </md-table-row>
  </md-table-header>
</md-table>
</md-card>
</div>

</div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'play',
  components: {},
  computed: {
    ...mapGetters(['players', 'dealer', 'currentPlayer'])
  },
  methods: {
    ...mapActions(['next_player'])
  }
};
</script>

<style>
#choices {
  margin: 2%;
  display: inline-block;
}
</style>
