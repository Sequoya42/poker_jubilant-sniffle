<template>
  <div class="wrapperTable">

  <div class="pokerTable">
<div id="nik">

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
  </div>
</div>
</div>
</template>

<script>
// import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'pokerTable',

  components: {},
  computed: {},
  methods: {}
};
</script>

<style>
* {
    box-sizing: border-box;
}

.wrapperTable {
  /*border: 2px solid;*/
}

.pokerTable {
  border: 5px solid rgb(28, 115, 10);
  border-radius: 40%;
  /*border: 2px solid rgb(1, 119, 23);*/
  /*box-shadow: 2px 2px 5px 5px black;*/
  background-color: #006400;
  display: inline-block;
  position: relative;
  min-height: 100px;
  max-height: 200px;
  max-width: 500px;
  width: 90%;
  height: 100%;
}

.playingCard {
  border-radius: 10%;
  border: 1px solid black;
  background-image: url('../assets/logo.png');
  background-size: 100% 100%;
  background-color: #A04800;
  float: left;
  margin: 5% 1% 10% 5%;
  width: 8%;
  min-width: 33px;
  height: 50px;
}

.Deck{
  box-shadow: 2px 2px 2px 2px rgb(142, 59, 57);
  height: 52px !important;
  margin-right: 5%;
}

#nik {
  margin: 10px;
}
</style>
