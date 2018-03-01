<template>
<v-container fluid
  class="home">
  Have cards and no poker chips? Play with cards in your hands, and bet on the computer.
  <div class="centerStuff">
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
