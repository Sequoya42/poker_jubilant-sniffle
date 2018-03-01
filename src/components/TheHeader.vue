<template>
<v-toolbar class="primary">

  <div class="title">
    <v-chip outline
      @click="redirect('Game')"> Play </v-chip>
    <v-chip outline
      @click="redirect('Description')"> Description </v-chip>
    <v-chip outline
      @click="redirect('Settings')"> Settings </v-chip>
  </div>

</v-toolbar>
</template>

<script>
export default {
  name: 'myHeader',
  methods: {
    redirect: function(loc) {
      this.$router.push({
        name: loc
      });
    }
  }
};
</script>

<style>
.headerStuff {
  text-align: center !important;
}

.routes {
  padding: 10%;
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
