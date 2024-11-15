import { createApp } from 'vue';
// Import for router
import { router } from './router';
import App from '../App.vue';

createApp(App).use(router).mount('#app')
