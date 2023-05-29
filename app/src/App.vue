<script setup></script>

<template>
	<nav>
		<router-link to="/">Home</router-link>
		<router-link to="/about">About</router-link>
		<router-link to="/persons">Persons</router-link>
		<router-link to="/products">Products</router-link>
		<router-link to="/bill">Bill</router-link>
	</nav>
	<main>
		<router-view></router-view>
	</main>
</template>

<style scoped lang="sass">
main, a, button
	display: block
	margin: auto
	text-align: center
nav
	display: flex
	align-items: space-between
	justify-content: center
	padding: 20px
	text-transform: uppercase
</style>
