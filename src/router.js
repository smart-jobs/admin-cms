import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/home.vue';

Vue.use(Router);

const router = new Router({
  mode: process.env.VUE_APP_ROUTER_MODE || 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/site/config',
      component: () => import(/* webpackChunkName: "cms_config" */ './views/config.vue'),
    },
    {
      path: '/site/list',
      component: () => import(/* webpackChunkName: "cms_sites" */ './views/sites.vue'),
    },
    {
      path: '/news',
      component: () => import(/* webpackChunkName: "cms_news" */ './views/news.vue'),
      children: [
        {
          path: '/news/:column',
        },
      ],
    },
    {
      path: '/service',
      component: () => import(/* webpackChunkName: "cms_news" */ './views/news.vue'),
      children: [
        {
          path: '/service/:column',
        },
      ],
    },
  ],
});

export default router;
