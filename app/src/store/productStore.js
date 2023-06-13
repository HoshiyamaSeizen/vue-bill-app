const Product = (id, name, price, buyer) => ({id, name, price, buyer, consumers: []})

export default {
	namespaced: true,
	state(){
		return {
			products: [],
		}
	},
	mutations: {
		ADD(state, {name, price, buyer}) {
			state.products.push(Product(state.products[state.products.length-1]?.id + 1 || 0, name, price, buyer));
		},
		EDIT(state, {id, name, price}){
			const product = state.products.find(p => p.id === id);
			product.name = name || `Product ${id + 1}`;
			product.price = price;
		},
		REMOVE(state, {id}){
			state.products = state.products.filter(c => c.id !== id);
		},
		EDIT_BUYER(state, {id, buyer}){
			state.products.find(p => p.id === id).buyer=buyer;
		},
		REMOVE_CONSUMER(state, {id, buyerChange}){
			state.products.forEach(product => {
				product.consumers = product.consumers.filter(c => c !== id);
				if(product.buyer === id) product.buyer = buyerChange;
			})
		},
		TOGGLE_CONSUMER(state, {id, client}){
			const consumers = state.products.find(p => p.id === id).consumers;
			if(!consumers.includes(client)) { 
				consumers.push(client) 
			} else { 
				consumers.splice(consumers.indexOf(client), 1) 
			}
		},
		TOGGLE_ALL_CONSUMERS(state, {id, clients}){
			const consumers = state.products.find(p => p.id === id).consumers
			const flag = consumers.length !== clients.length;
			consumers.splice(0, consumers.length)
			if(flag) clients.forEach(c => consumers.push(c.id));
		},
	},
	actions: {
		addProduct({ commit }, payload) {
			commit('ADD', payload);
		},
		editProduct({ commit }, payload) {
			commit('EDIT', payload);
		},
		removeProduct({ commit }, payload) {
			commit('REMOVE', payload);
		},
		editBuyer({ commit }, payload) {
			commit('EDIT_BUYER', payload);
		},
		toggleConsumer({ commit }, payload) {
			commit('TOGGLE_CONSUMER', payload);
		},
		toggleAllConsumers({ commit }, payload) {
			commit('TOGGLE_ALL_CONSUMERS', payload);
		}
	}
}