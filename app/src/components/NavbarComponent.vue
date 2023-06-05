<template>
	<nav>
		<router-link class="home" to="/">Home</router-link>
		<router-link to="/persons">Persons</router-link>
		<router-link to="/products">Products</router-link>
		<router-link to="/bill">Bill</router-link>
	</nav>
</template>

<style scoped lang="sass">
main, a
	display: block
	margin: auto
	text-align: center
nav
	position: absolute
	width: 100%
	max-height: 64px
	display: flex
	justify-content: center
	padding: 20px
	text-transform: uppercase
	z-index: 1
</style>