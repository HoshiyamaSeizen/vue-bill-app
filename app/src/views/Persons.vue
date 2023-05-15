<script>
import { nextTick } from 'vue'

export default{
	data() {
		return {
			clients: [...Array(10).keys()].map(id => { return {name: "John Doe "+(id+1)}}),
			editName: "",
			editId: null
		}
	},
	methods: {
		remove(id) {
			this.stopEdit();
			this.clients.splice(id, 1);
		},
		startEdit(id) {
			this.stopEdit();
			this.editId = id;
			this.editName = this.clients[id].name
		},
		stopEdit() {
			if(this.editId === null) return;
			this.clients[this.editId].name = this.editName || `Client ${this.editId+1}`;
			this.editId = null;
		},
		add(){
			this.clients.push({name: ""});
			this.startEdit(this.clients.length - 1);
			nextTick(() => {
				const list = this.$el.querySelector('.person-list');
				list.scrollTop = list.scrollHeight;
			})
		}
	}
}
</script>

<template>
	<div class="container">
		<h1>Persons</h1>
		<ul class="person-list">
			<li class="list-item" v-for="client, id in clients" :class="{editing: id === editId}">
				<div class="details">
					<div class="icon">{{client.name[0]}}</div>
					<p v-if="id !== editId" class="name">{{client.name}}</p>
					<input
						v-else
						v-model="editName"
						type="text"
						name="name-inp"
						id="name-inp"
						placeholder="Enter the name..."
					/>
				</div>
				<i v-if="id !== editId" class="bi bi-pencil-fill" @click="startEdit(id)"></i>
				<i v-else class="bi bi-check-lg" @click="stopEdit()"></i>
				<i class="bi bi-trash-fill" @click="remove(id)"></i>
			</li>
			<li class="new-user-btn" @click="add()"><i class="bi bi-person-plus-fill"></i>Add new</li>
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
