<template>
  <v-toolbar class="primary">
    <!-- <v-menu> -->
  <!-- <v-btn class="darkGreen" slot="activator">
   <v-icon>home</v-icon>
   <div class="routes">
     Routes
   </div>
  </v-btn> -->

  <!-- <v-list>
  <v-list-tile @click="redirect('Game')"> Le game </v-list-tile>
  <v-list-tile @click="redirect('Home')"> le home </v-list-tile>
  <v-list-tile @click="redirect('Settings')"> le settings </v-list-tile>
</v-list> -->

<!-- </v-menu> -->

<div class="title chipStuff">
  <v-chip class="secondary" @click="redirect('Game')"> Play </v-chip>
  <v-chip class="secondary" @click="redirect('Home')"> le home </v-chip>
  <v-chip class="secondary" @click="redirect('Settings')"> Settings </v-chip>

</div>

    <!-- <h4 class="title">Poker jubilant sniffle</h4> -->
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
.headerStuff {
  text-align: center !important;
}

.chipStuff {
  /*float: right !important;*/
/*matgin: auto;*/
}

.routes {
  padding: 10px;
}

.title {
  flex: 1;
  color: #FFFFFF;
}

.customGreen {
  background-color: inherit;
}

.darkGreen {
background-color: #38ac44 !important;
color: white !important;
}

</style>
