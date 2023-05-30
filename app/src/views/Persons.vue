<script>
import { nextTick } from 'vue'
import { mapState, mapActions } from 'vuex'

import List from '../components/ListComponent.vue'

export default{
    components: {
        List
    },
	data() {
		return {
			editName: "",
			editId: null
		}
	},
	computed: {
		...mapState('clientStore', {
			clients: state => state.clients,
		}),
	},
	methods: {
		...mapActions('clientStore', [
			'addClient', 'editClient', 'removeClient'
		]),
		remove(id) {
			this.stopEdit();
			this.removeClient({id});
		},
		startEdit(id) {
			this.stopEdit();
			this.editId = id;
			this.editName = this.clients.find(c => c.id === id).name;
			nextTick(() => this.$el.querySelector('#name-inp').focus());
		},
		stopEdit() {
			if(this.editId === null) return;
			this.editClient({id: this.editId, name: this.editName});
			this.editId = null;
		},
		add(){
			this.addClient({name: ""});
			this.startEdit(this.clients[this.clients.length - 1].id);
			nextTick(() => {
				const list = this.$el.querySelector('.list');
				list.scrollTop = list.scrollHeight;
				this.$el.querySelector('#name-inp').focus();
			});
		},
		handleInputKey(e, target){
			if(!['Tab', 'Enter'].includes(e.code)) return;
			e.preventDefault();
			this.$el.querySelector(target).click();
		}
	}
}
</script>

<template>
	<div class="container">
		<h1>Persons</h1>
		<List>
			<li class="list-item" v-for="{id, name} in clients" :class="{editing: id === editId}" :key="id">
				<div class="details">
					<div class="icon">{{name[0]}}</div>
					<p v-if="id !== editId" class="name">{{name}}</p>
					<input
						v-else
						v-model="editName"
						type="text"
						name="name-inp"
						id="name-inp"
						placeholder="Enter the name..."
						@keydown="(e) => this.handleInputKey(e, '.bi-check-lg')"
					/>
				</div>
				<i v-if="id !== editId" class="bi bi-pencil-fill" @click="startEdit(id)"></i>
				<i v-else class="bi bi-check-lg" @click="stopEdit()"></i>
				<i class="bi bi-trash-fill" @click="remove(id)"></i>
			</li>
			<li class="list-btn" @click="add()" :key="-1"><i class="bi bi-person-plus-fill"></i>Add new</li>
		</List>
        <router-link class="next-btn" to="/products">Next &#8594; Add products</router-link>
	</div>
</template>

<style scoped lang="sass">
@import '../styles/_vars.sass'
li
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
    &:hover i
        opacity: 1
    i
        color: $color-main
        transition: color 150ms ease-out, opacity 100ms ease-out
li:not(.list-leave-to)
    transition: scale 200ms ease-out
    &:hover
        scale: 1.01
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
</style>
