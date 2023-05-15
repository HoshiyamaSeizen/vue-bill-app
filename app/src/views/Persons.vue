<script setup></script>

<template>
	<div class="container">
		<h1>Persons</h1>
		<ul>
			<li class="list-item" v-for="id in [...Array(10).keys()]">
				<div class="details">
					<div class="icon">J</div>
					<p v-if="id !== 5" class="name">John Doe {{ id + 1 }}</p>
					<input
						v-else
						type="text"
						name="name-inp"
						id="name-inp"
						placeholder="Enter the name..."
					/>
				</div>
				<i v-if="id !== 5" class="bi bi-pencil-fill"></i>
				<i v-else class="bi bi-check-lg"></i>
				<i class="bi bi-trash-fill"></i>
			</li>
			<li class="new-user-btn"><i class="bi bi-person-plus-fill"></i>Add new</li>
		</ul>
	</div>
</template>

<style scoped lang="sass">
@import '../styles/_vars.sass'
h1
    border-bottom: 3px solid $color-main
    padding-bottom: 20px
    margin: 10px 8px 35px
ul
    display: block
    height: 75%
    list-style: none
    padding: 0
    overflow-x: hidden
    overflow-y: auto
    li
        padding: 15px 25px
        margin: 10px 10px 0
        border: 2px solid lighten($color-main, 50%)
        border-radius: 8px
        font-size: 1.5em
        font-weight: 600
        scale: 1
        transition: scale 200ms ease-out
        &.list-item
            display: flex
            align-items: center
            justify-content: space-between
            gap: 15px
            margin-bottom: 10px
            i
                opacity: 0
                &:hover
                    color: $color-active
        &:hover
            scale: 1.01
            i
                opacity: 1
        i
            color: $color-main
            transition: color 150ms ease-out, opacity 100ms ease-out
.details
    flex: 10
    text-align: left
    .icon, p
        margin: 0
        display: inline-block
    .icon
        text-transform: uppercase
        display: inline-flex
        align-items: center
        justify-content: center
        text-align: center
        width: 36px
        height: 36px
        border-radius: 50%
        color: lighten($color-active, 10%)
        background-color: $color-main
        margin-right: 15px
        @include no-select
    input
        padding: 4px 12px
        border: none
        border-radius: 6px
        background-color: lighten($color-secondary, 11%)
        color: $color-text
        font-weight: 400
        width: 220px
        outline: none
        @include shadow(0px 0px 2px 2px rgba(0, 0, 0, 0.2) inset)
.new-user-btn
    margin-bottom: 5px
    @include no-select
    &:hover
        background-color: darken($color-secondary, 2%)
    &:active
        scale: 0.99
    i
        margin-right: 15px
i.bi-check-lg
    font-size: 2rem
    &:hover
        color: darkgreen !important
i.bi-trash-fill:hover
    color: darkred !important
</style>