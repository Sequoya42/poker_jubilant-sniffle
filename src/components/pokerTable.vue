
/*
https://stackoverflow.com/questions/5445491/height-equal-to-dynamic-width-css-fluid-layout
*/

<template>
	<v-flex class="pokerTable">

	</v-flex>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import playerCard from './playerCard.vue';

export default {
  name: 'pokerTable',

  components: {
    playerCard
  },
  computed: {
    ...mapGetters(['nPlayers', 'players', 'cards', 'pot'])
  },
  methods: {}
};
</script>

<style scoped>

.pokerTable {
  border-radius: 66.666%;
  background-color: #8b6548;
  /*display: inline-block;*/
  /*position: relative;*/
  /*width: 50vw;*/
  /*height: inherit;*/
}

.playingCard {
  border-radius: 10%;
  border: 1px solid #443022;
  background-image: url('../assets/logo.png');
  background-size: 100% 100%;
  background-color: #003F2F;
  float: left;
  margin: 10% 1% 10% 5%;
  width: 8%;
  min-width: 33px;
  height: 50px;
}

.pot{
/*text-align: center;*/
margin-top: 25%;
position: absolute;
width: auto;
text-align: center;
}

.Deck{
  box-shadow: 2px 2px 2px 2px rgb(142, 59, 57);
  height: 52px !important;
  margin-right: 5%;
}

.test {
  /*background-color: red;*/
  /*position: absolute;*/
}

.debug {
  border: 1px solid black;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}

.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>
