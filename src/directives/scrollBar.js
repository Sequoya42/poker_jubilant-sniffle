Vue.directive('scrollBar', {
  bind: function(el) {
    this.el.scrollTop = this.el.scrollHeight;
  },

  update: function(newValue, oldValue) {
    this.el.scrollTop = this.el.scrollHeight;
  }
});
