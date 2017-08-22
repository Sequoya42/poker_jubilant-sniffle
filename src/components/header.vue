<template>
  <v-toolbar dark class="primary">
    <v-menu>
  <v-btn primary dark slot="activator">
      Routes <v-icon>home</v-icon>
  </v-btn>

  <v-list>
      <v-list-tile @click="redirect('Game')"> Le game </v-list-tile>
    <v-list-tile @click="redirect('Home')"> le home </v-list-tile>
    <v-list-tile @click="redirect('Settings')"> le settings </v-list-tile>
  </v-list>

</v-menu>
    <h4 style="flex: 1">Poker jubilant sniffle</h4>
  </v-toolbar>
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
