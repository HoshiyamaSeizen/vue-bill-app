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
            editPrice: 0,
			editId: null
		}
	},
	computed: {
		...mapState('clientStore', {
			clients: state => state.clients,
		}),
        ...mapState('productStore', {
			products: state => state.products,
		}),
	},
	methods: {
		...mapActions('productStore', [
			'addProduct', 'editProduct', 'removeProduct', 'editBuyer', 'toggleConsumer', 'toggleAllConsumers'
		]),
		remove(id) {
			this.stopEdit();
			this.removeProduct({id});
		},
		startEdit(id) {
			this.stopEdit();
			this.editId = id;
            const product = this.products.find(p => p.id === id);
			this.editName = product.name;
            this.editPrice = product.price;
			nextTick(() => this.$el.querySelector('#name-inp').focus());
		},
		stopEdit() {
			if(this.editId === null) return;
			this.editProduct({id: this.editId, name: this.editName, price: this.editPrice});
			this.editId = null;
		},
		add(){
			this.addProduct({name: "", price: 0, buyer: 0});
			this.startEdit(this.products[this.products.length - 1].id);
			nextTick(() => {
				const list = this.$el.querySelector('.list');
				list.scrollTop = list.scrollHeight;
				this.$el.querySelector('#name-inp').focus();
			});
		},
        setBuyer(id, buyer){
            this.editBuyer({id, buyer})
        },
		handleInputKey(e, target, focus = false){
			if(!['Tab', 'Enter'].includes(e.code)) return;
			e.preventDefault();
			const el = this.$el.querySelector(target);
			focus ? el.focus() : el.click();
		}
	},
    unmounted() {
		this.stopEdit();
	},
}
</script>

<template>
    <div class="container">
		<h1>Products</h1>
		<List v-if="clients.length">
			<li class="list-item" v-for="{id, name, price, buyer, consumers} in products" :class="{editing: id === editId}" :key="id">
				<div class="details">
                    <div class="details-top">
                        <div class="info">
                            <p v-if="id !== editId" class="name">{{name}}</p>
                            <input
                                v-else
                                v-model="editName"
                                type="text"
                                name="name-inp"
                                id="name-inp"
                                placeholder="Enter the name..."
								@keydown="(e) => this.handleInputKey(e, '#price-inp', true)"
                            />
                            <p v-if="id !== editId" class="price">${{price}}</p>
                            <input
                                v-else
                                v-model="editPrice"
                                type="number"
                                name="price-inp"
                                id="price-inp"
                                placeholder="Enter the price..."
								@keydown="(e) => this.handleInputKey(e, '.bi-check-lg')"
                            />
                        </div>
                        <div class="buyer-select">
                            <i class="bi bi-credit-card-2-back-fill"></i>
                            <select name="buyer" class="form-select" @change="(e) => setBuyer(id, +e.target.value)" :value="buyer">
                                <option v-for="client in clients" :value="client.id">{{client.name}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="details-bottom">
                        <div class="client-list">
                            <div 
                                class="client-list-item client-list-select-all"
                                :class="{selected: consumers.length === clients.length}" 
                                @click="toggleAllConsumers({id, clients})"
                            >
                                <div class="icon">+</div>
                                <p class="client-name">All</p>
                            </div>
                            <div 
                                class="client-list-item" 
                                :class="{selected: consumers.includes(client.id)}" 
                                v-for="client in clients" 
                                @click="toggleConsumer({id, client: client.id})"
                            >
                                <div class="icon">{{client.name[0]}}</div>
                                <p class="client-name">{{client.name}}</p>
                            </div>
                        </div>
                    </div>
				</div>
				<i v-if="id !== editId" class="bi bi-pencil-fill i-pointer" @click="startEdit(id)"></i>
				<i v-else class="bi bi-check-lg i-pointer" @click="stopEdit()"></i>
				<i class="bi bi-trash-fill i-pointer" @click="remove(id)"></i>
			</li>
			<li class="list-btn" @click="add()" :key="-1"><i class="bi bi-bag-plus-fill"></i>Add new</li>
		</List>
        <h4 class="info-message" v-else>No clients added</h4>
        <router-link v-if="clients.length" class="next-btn" to="/bill">Next &#8594; Calculate cost</router-link>
        <router-link v-else class="next-btn" to="/persons">Add persons</router-link>
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
    &:hover
        i
            opacity: 1
    i
        color: $color-main
        transition: color 150ms ease-out, opacity 100ms ease-out
    .buyer-select i
        opacity: 1
        &:hover
            color: inherit
.details
    flex: 10
    text-align: left
    max-width: 90%
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
        &:first-child
            margin-right: 20px
.details-top
    display: flex
    align-items: space-between
    justify-content: center
    .info
        flex: 3
        .name
            display: block
            font-size: 1.4rem
            line-height: 1rem
        .price
            display: block
            font-size: 1rem
            color: darkgreen
    .buyer-select
        flex: 1
        text-align: right
        position: relative
        i
            position: absolute
            top: 55%
            transform: translateY(-50%)
            left: 10px
        .form-select
            padding-left: 44px
            width: 100%
            height: 100%
            display: inline-block !important
            border: none
            border-radius: 6px
            background-color: lighten($color-secondary, 11%)
            color: $color-text
            font-weight: 600
            @include shadow(0px 0px 2px 2px rgba(0, 0, 0, 0.2) inset)
            cursor: pointer
.details-bottom
    margin-top: 20px
    .client-list
        max-width: 100%
        display: flex
        overflow-x: auto
        gap: 20px
        padding-bottom: 10px
        .client-list-item
            display: inline-block
            margin: 2px
            min-width: 100px
            max-height: 95px
            min-height: 95px
            padding: 15px 10px
            text-align: center
            border: 2px solid $color-main
            border-radius: 12px
            scale: 1
            background-color: $color-secondary
            transition: all 200ms ease-out
            @include no-select
            cursor: pointer
            .client-name
                display: block
                font-size: 0.8rem
                font-weight: 700
            .icon
                margin: 0 auto 4px
            &:hover
                scale: 1.02
            &.selected
                background-color: $color-main
                color: $color-secondary
                .icon
                    background-color: $color-active
                    color: $color-secondary
.info-message
    text-align: center
    margin-top: 30vh
</style>