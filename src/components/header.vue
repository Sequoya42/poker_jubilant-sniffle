<template>
  <v-toolbar class="primary">

<div class="title chipStuff">
  <v-chip class="secondary" @click="redirect('Game')"> Play </v-chip>
  <v-chip class="secondary" @click="redirect('Home')"> le home </v-chip>
  <v-chip class="secondary" @click="redirect('Settings')"> Settings </v-chip>

</div>

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
