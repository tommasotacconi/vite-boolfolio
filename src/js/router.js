import { createRouter, createWebHistory } from 'vue-router';

import AppHome from '../pages/AppHome.vue';
import AppAbout from '../pages/AppAbout.vue';
import AppProjects from '../pages/AppProjects.vue';
import AppProjectShow from '../pages/AppProjectShow.vue';

const routes = [
  { path: '/', component: AppHome, name: 'home' },
  { path: '/projects', component: AppProjects, name: 'projects' },
  { path: '/projects/:id', component: AppProjectShow, name: 'projects.show' },
  { path: '/about', component: AppAbout, name: 'about' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export { router };