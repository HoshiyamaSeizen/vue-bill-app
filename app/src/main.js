import { createApp } from 'vue';
import router from './Router.js';

import './styles/style.sass';
import App from './App.vue';

createApp(App).use(router).mount('#app');
