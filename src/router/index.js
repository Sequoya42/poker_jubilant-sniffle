import Vue from 'vue';
import Router from 'vue-router';
import Description from '@/components/Description';
import Game from '@/components/Game';
import Settings from '@/components/Settings';

Vue.use(Router);

export default new Router({
  routes: [{
      path: '/description',
      name: 'Description',
      component: Description
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
    },
  ]
});