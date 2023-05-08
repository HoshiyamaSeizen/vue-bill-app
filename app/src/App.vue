<script setup></script>

<template>
	<div class="container">
		<button type="button" class="btn btn-primary">Hello World</button>
		<router-link to="/">Go to Home</router-link>
		<router-link to="/about">Go to About</router-link>

		<router-view></router-view>
	</div>
</template>

<style scoped lang="sass">
*
  display: block
  margin: auto
  text-align: center
</style>
