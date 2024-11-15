import { createMemoryHistory, createRouter } from 'vue-router';

import AppHome from '../pages/AppHome.vue';
import AppAbout from '../pages/AppAbout.vue';

const routes = [
  { path: '/', component: AppHome, name: 'home' },
  { path: '/about', component: AppAbout, name: 'about' },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});