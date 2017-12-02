<template>
  <v-app dark>
    <my-header></my-header>
      <router-view></router-view>
</v-app>
</template>

<script>
export default {
  name: 'app',
  components: {
    myHeader: () => import('./components/header.vue')
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /*background-color: #335C67;*/
  /*background: url('./assets/pattern.jpg') no-repeat center center fixed;*/
  /*background: linear-gradient( ) no-repeat center center fixed;*/
  -webkit-background-size: cover;
 -moz-background-size: cover;
 -o-background-size: cover;
 background-size: cover;
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
