<script>
import Navbar from './components/NavbarComponent.vue';
import Router from './components/Router.vue'
export default { components: { Navbar, Router }}
</script>

<template>
	<Navbar></Navbar>
	<main>
		<Router></Router>
	</main>
</template>
