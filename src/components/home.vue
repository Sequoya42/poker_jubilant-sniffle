<template>
  <v-container fluid class="home">
    <v-card>
      <v-card-title primary-title>
        <div>

        <h3 class="headline ">
        Poker stack
      </h3>
    </div>
      </v-card-title>
      <v-card-text>
        <h6>
          Have cards and no poker chips?
          <br />

          Play with cards in your hands, and bet on the computer.

        </h6>

    </v-card-text>
    </v-card>
    <!-- <div id="buttonLink"> -->
    <!-- <v-btn class="centerStuff"> -->

    <div class="centerStuff">
      <!-- <span> -->
        <router-link :to="{name: 'Settings'}">
          <v-btn>
          Settings
          </v-btn>
        </router-link>
    <!-- </span> -->
    </div>
  </v-container fluid>

</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.centerStuff {
  margin-top: 20%;
  display: inline-flex;
}
</style>
