<template>

  <div class="wrapperTable">
      <playerFace  v-for="(player, index) in players" :player="player" :index="index"></playerFace>
  <div class="pokerTable">

    <div class="playingCard Deck">
    </div>
    <div class="playingCard">
    </div>
    <div class="playingCard">
    </div>
    <div class="playingCard">
    </div>
    <div class="playingCard">
    </div>
    <div class="playingCard">
    </div>
</div>
</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'pokerTable',

  components: {
    playerFace: require('./playerFace.vue')
  },
  computed: {
    ...mapGetters(['nPlayers', 'players'])
  },
  methods: {}
};
</script>

<style>
* {
    box-sizing: border-box;
}

.wrapperTable {
  display: flex;
  flex-direction: row;
  justify-content: center;
  min-height: 600px;
  background-color: #EEE;
  max-width: 900px;
  padding: 20px;
  margin: 0 auto;
  align-items: center;
}

.pokerTable {
  order: 2;
  border: 12px solid #443022;
  border-radius: 150px;
  background-color: #008413;
  display: inline-block;
  position: relative;
  min-height: 300px;
  max-width: 500px;
  width: 90%;
  height: 100%;
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

.Deck{
  box-shadow: 2px 2px 2px 2px rgb(142, 59, 57);
  height: 52px !important;
  margin-right: 5%;
}

.test {
  /*background-color: red;*/
  /*position: absolute;*/
}

</style>
