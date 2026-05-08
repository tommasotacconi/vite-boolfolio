import { createApp } from 'vue';
// Import for router
import { router } from './router';
import '../style/general.scss';
import 'bootstrap/js/dist/collapse';
import 'bootstrap-icons/font/bootstrap-icons.css';
import App from '../App.vue';

createApp(App).use(router).mount('#app');
