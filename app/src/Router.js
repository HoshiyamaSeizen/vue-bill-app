import { createRouter, createWebHashHistory } from 'vue-router';

import Home from './views/Home.vue';
import About from './views/About.vue';
import Persons from './views/Persons.vue';
import Products from './views/Products.vue';
import Bill from './views/Bill.vue';

const routes = [
	{ path: '/', component: Home },
	{ path: '/about', component: About },
	{ path: '/persons', component: Persons },
	{ path: '/products', component: Products },
	{ path: '/bill', component: Bill },
];

export default createRouter({
	history: createWebHashHistory(),
	routes,
});
