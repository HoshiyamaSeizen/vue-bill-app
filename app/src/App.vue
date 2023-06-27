<script>
import Navbar from './components/NavbarComponent.vue';
import Router from './components/Router.vue'
export default { 
	components: { Navbar, Router },
	methods: {
		changePage(e) {
			const change = ["ArrowLeft", null, "ArrowRight"].indexOf(e.code)-1;
			const route = +this.$route.name + change;
			if(route < 1 || route > 4 || change < -1){ return; }
			this.$router.push({ name: ''+route })
		}
	},
	created() {
		window.addEventListener('keydown', this.changePage);
	},
	destroyed() {
		window.removeEventListener('keydown', this.changePage);
	},
}
</script>

<template>
	<Navbar></Navbar>
	<main>
		<Router></Router>
	</main>
</template>
