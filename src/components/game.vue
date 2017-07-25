<template>
  <div class="game">
    <form novalidate @submit.stop.prevent="submit">
  <md-input-container>
    <md-icon>euro_symbol</md-icon>
    <label>Money stack</label>
    <md-input type="text"></md-input>
    <md-icon>attach_money</md-icon>
  </md-input-container>

  <md-input-container>
    <md-icon>people</md-icon>
    <label>Number of players</label>
    <md-input type="text"></md-input>
  </md-input-container>

  <md-input-container>
    <md-icon>done</md-icon>
    <label>Small blind</label>
    <md-input type="text"></md-input>
  </md-input-container>


  <md-input-container>
    <md-icon>done_all</md-icon>
    <label>Big blind</label>
    <md-input type="text"></md-input>
  </md-input-container>
</form>
  </div>
</template>

<script>
export default {
  name: 'game',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
