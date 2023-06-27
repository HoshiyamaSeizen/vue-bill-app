import { createApp } from 'vue';
import router from './router.js';
import store from './store/store.js';

import './styles/style.sass';
import './styles/animations.sass';
import App from './App.vue';

createApp(App)
	.use(store)
	.use(router)
	.mount('#app');
