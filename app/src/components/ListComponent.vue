<template>
	<TransitionGroup tag="ul" name="list" class="list">
		<slot></slot>
	</TransitionGroup>
</template>

<style lang="sass">
@import '../styles/_vars.sass'
.list
	display: block
	list-style: none
	padding: 0
	overflow-x: hidden
	overflow-y: auto
	justify-self: flex-start
.list-item, li
	padding: 15px 25px
	margin: 10px 10px 0
	border: 2px solid lighten($color-main, 50%)
	border-radius: 8px
	font-size: 1.5em
	font-weight: 600
.list-btn
	cursor: pointer
	margin-bottom: 5px
	text-align: center
	@include no-select
	&:hover
		background-color: darken($color-secondary, 2%)
	&:active
		scale: 0.99
	i
		margin-right: 15px
.info-message
	text-align: center
	margin-top: auto
i.bi-check-lg
	font-size: 2rem
	&:hover
		color: darkgreen !important
i.bi-trash-fill:hover
	color: darkred !important
.i-pointer
	cursor: pointer
</style>