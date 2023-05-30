import { createRouter, createWebHashHistory } from 'vue-router';

import Home from './views/Home.vue';
import Persons from './views/Persons.vue';
import Products from './views/Products.vue';
import Bill from './views/Bill.vue';

const routes = [
	{ path: '/', component: Home, name: 0 },
	{ path: '/persons', component: Persons, name: 1 },
	{ path: '/products', component: Products, name: 2 },
	{ path: '/bill', component: Bill, name: 3 },
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

router.afterEach((to, from) => {
	to.meta.transition = to.name < from.name ?'slide-right' : 'slide-left';
})

export default router
