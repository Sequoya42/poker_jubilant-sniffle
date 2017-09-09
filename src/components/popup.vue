<template>
<div>
  <v-snackbar
  :timeout="2000"
  :top="true"
  v-model="snackbar"
  >
  <p>
  <b>{{ winner }}</b>   won the hand
  </p>
    <v-btn flat class="blue--text" @click.native="snackbar = false">Close</v-btn>
</v-snackbar>
</div>
</template>

<script>
export default {
  props: ['winner'],
  name: 'popup',

  data: function() {
    return {
      snackbar: false
    };
  },
  watch: {
    winner: function(value) {
      this.snackbar = value;
    }
  },
  computed: {},
  methods: {},
  components: {}
};
</script>

<style>

</style>
