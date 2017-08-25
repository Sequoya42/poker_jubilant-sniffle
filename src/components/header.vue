<template>
  <v-toolbar  class="customGreen">
    <v-menu>
  <v-btn class="darkGreen" slot="activator">
   <v-icon>home</v-icon>
   <div class="routes">
     Routes
   </div>
  </v-btn>

  <v-list>
      <v-list-tile @click="redirect('Game')"> Le game </v-list-tile>
    <v-list-tile @click="redirect('Home')"> le home </v-list-tile>
    <v-list-tile @click="redirect('Settings')"> le settings </v-list-tile>
  </v-list>

</v-menu>
    <h4 class="title">Poker jubilant sniffle</h4>
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
.routes {
  padding: 10px;
}

.title {
  flex: 1;
  color: #FFFFFF;
}

.customGreen {
  background-color: #55AA55 !important;
}

.darkGreen {
background-color: #38ac44 !important;
color: white !important;
}

</style>
