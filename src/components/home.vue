<template>
  <div class="home">
    <v-card>
      <v-card-title>
        First try at VUEJS
      </v-card-title>
      <v-card-text>
      Using vuex
    </v-card-text>
    </v-card>
    <!-- <div id="buttonLink"> -->
    <!-- <v-btn class="centerStuff"> -->

    <div class="centerStuff">
      <span>
      <v-btn>
        <router-link :to="{name: 'Settings'}">Settings</router-link>
      </v-btn>
    </span>
    </div>
  </div>

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
  background-color: red;
  margin-top: 20%;
  display: inline-flex;
}
</style>
