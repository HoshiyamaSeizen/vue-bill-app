<script>
import Navbar from './components/NavbarComponent.vue';
export default { components: { Navbar }}
</script>

<template>
	<Navbar></Navbar>
	<main>
		<router-view></router-view>
	</main>
</template>
