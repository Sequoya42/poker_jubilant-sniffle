<template>
  <div class="home">
    {{msg}}
    <div id="buttonLink">

      <router-link :to="{name: 'Settings'}">Settings</router-link>
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

#buttonLink {
  /*border: 5px solid;*/
  padding: 100px;
}
</style>
