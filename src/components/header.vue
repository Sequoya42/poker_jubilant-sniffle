<template>
  <md-toolbar>
    <md-menu>
  <md-button md-menu-trigger>
    <md-icon>menu</md-icon>
  </md-button>

  <md-menu-content>
    <md-menu-item>My Item 1</md-menu-item>
    <md-menu-item>My Item 2</md-menu-item>
    <md-menu-item>My Item 3</md-menu-item>
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
  name: 'myHeader'
};
</script>

<style>

</style>
