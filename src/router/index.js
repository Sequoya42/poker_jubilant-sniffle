import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/home';
import Game from '@/components/game';
import Settings from '@/components/settings';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/description',
      name: 'Home',
      component: Home
    },
    {
      path: '/',
      name: 'Game',
      component: Game
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
    }
  ]
});
