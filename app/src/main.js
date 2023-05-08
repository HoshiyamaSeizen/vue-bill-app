import { createApp } from 'vue'
import router from './Router.js'

import './style.sass'
import App from './App.vue'

createApp(App).use(router).mount('#app')
