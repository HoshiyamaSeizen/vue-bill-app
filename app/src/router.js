import { createRouter, createWebHashHistory } from 'vue-router';

import Home from './views/Home.vue';
import Persons from './views/Persons.vue';
import Products from './views/Products.vue';
import Bill from './views/Bill.vue';

const routes = [
	{ path: '/', component: Home, name: "1" },
	{ path: '/persons', component: Persons, name: "2" },
	{ path: '/products', component: Products, name: "3" },
	{ path: '/bill', component: Bill, name: "4" },
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

router.afterEach((to, from) => {
	if(to.name === "1" || from.name === "1"){ to.meta.transition = 'fade'; }
	else { to.meta.transition = to.name < from.name ?'slide-right' : 'slide-left'; }
})

export default router
