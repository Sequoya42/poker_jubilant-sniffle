<template>
  <md-toolbar>
    <md-menu>
  <md-button md-menu-trigger>
    <md-icon>menu</md-icon>
  </md-button>
  <md-menu-content>
    <md-menu-item @click="redirect('Game')">le game </md-menu-item>
    <md-menu-item @click="redirect('Home')"> le home </md-menu-item>
    <md-menu-item @click="redirect('Settings')"> le settings </md-menu-item>
  </md-menu-content>
</md-menu>

    <h2 class="md-title" style="flex: 1">Default</h2>
    <md-button class="md-icon-button">
      <md-icon>favorite</md-icon>
    </md-button>
  </md-toolbar>
</template>

<script>
export default {
  name: 'myHeader',
  methods: {
    redirect: function(loc) {
      this.$router.push({ name: loc });
    }
  }
};
</script>

<style>
</style>
