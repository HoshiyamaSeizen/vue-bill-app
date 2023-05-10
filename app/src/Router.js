import { createRouter, createWebHashHistory } from 'vue-router';

import Home from './views/Home.vue';
import About from './views/About.vue';
import Persons from './views/Persons.vue';

const routes = [
	{ path: '/', component: Home },
	{ path: '/about', component: About },
	{ path: '/persons', component: Persons },
];

export default createRouter({
	history: createWebHashHistory(),
	routes,
});
