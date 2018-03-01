<template>
<v-app dark>
  <TheHeader></TheHeader>
  <router-view app></router-view>
</v-app>
</template>

<script>
export default {
  name: 'app',
  components: {
    TheHeader: () =>
      import ('./components/TheHeader.vue')
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

}
</style>
