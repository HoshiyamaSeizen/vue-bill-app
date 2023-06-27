<template>
	<div class="landing">
		<div class="centered">
			<h1>Bill Split App</h1>
			<router-link class="link" to="/persons">Start &#8594; Add persons</router-link>
		</div>
	</div>
</template>

<style scoped lang="sass">
@import '../styles/_vars.sass'
.landing
	position: absolute
	top: 0
	width: 100%
	height: 100%
	z-index: 0
	background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), center / cover url("/assets/background.webp")
.centered
	position: absolute
	top: 50%
	left: 50%
	transform: translate(-50%, -50%)
	text-align: center
	h1
		text-transform: uppercase
		font-size: 7rem
		@include no-select
		-webkit-text-stroke: 2px $color-secondary
		-webkit-text-fill-color: rgba(255,255,255,0.1)
	a  
		min-width: 340px
		display: block
		padding: 15px 20px 20px
		border: 4px solid $color-secondary
		border-radius: 20px
		font-size: 2rem
		margin-top: 70px
</style>