<template>
  <v-app>
  <div id="app" class="test">
    <my-header></my-header>
      <router-view></router-view>
  </div>
</v-app>
</template>

<script>
export default {
  name: 'app',
  components: {
    myHeader: require('./components/header.vue')
  }
};
</script>

<style>
#app {
  /*background-color: #BBBBB5 !important;*/
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

position:absolute;
top:0px;
left:0px;
right:0px;
bottom:0px;
}
/*.test,
.test > div {
  border: 1px solid red
}
.test > div  div {
  border: 2px solid blue;
}*/

</style>
