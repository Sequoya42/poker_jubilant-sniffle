<template>
<div class="wrapperTable">
  <div class="pokerTable">
    <v-chip v-if="pot"
      class="primary green darken-2 pot">{{pot}}</v-chip>
    <v-chip v-else
      class="primary green"> DONE</v-chip>
    <div class="playingCard Deck">
    </div>
    <transition-group name="list">
      <div v-for="card in cards"
        class="playingCard"
        :key="card">
      </div>
    </transition-group>
  </div>
  <playerCard v-for="(player, index) in players"
    :key="index"
    :player="player"
    :index="index"></playerCard>
</div>
</template>

<script>
import {
  mapGetters,
  mapMutations
} from 'vuex';
export default {
  name: 'pokerTable',
  components: {
    playerCard: () =>
      import ('./playerCard.vue')
  },
  computed: {
    ...mapGetters(['nPlayers', 'players', 'cards', 'pot'])
  },
  methods: {}
};
</script>

<style>
* {
  box-sizing: border-box;
}

.wrapperTable {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  min-height: 300px;
  max-width: 900px;
  padding: 20px;
  margin: 0 auto;
  margin-top: 6%;
  align-items: center;
}

.pokerTable {
  order: 2;
  border: 6px solid;
  border-radius: 150px;
  background-color: #8b6548;
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

.pot {
  margin-top: 25%;
  position: absolute;
  width: auto;
  text-align: center;
}

.Deck {
  box-shadow: 2px 2px 2px 2px rgb(142, 59, 57);
  height: 52px !important;
  margin-right: 5%;
}

.debug {
  border: 1px solid black;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s
}

.fade-enter,
.fade-leave-to {
  opacity: 0
}

.list-item {
  display: inline-block;
  margin-right: 10px;
}

.list-enter-active,
.list-leave-active {
  transition: all 1s;
}

.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
