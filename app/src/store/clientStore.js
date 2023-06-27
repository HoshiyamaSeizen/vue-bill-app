const Client = (id, name) => ({id, name})

export default {
	namespaced: true,
	state() {
		return {
			clients: [],
		}
	},
	getters: {
		getFirstClientID: state => () => state.clients[0]?.id || 0
	},
	mutations: {
		ADD(state, {name}) {
			state.clients.push(Client(state.clients[state.clients.length-1]?.id + 1 || 0, name));
		},
		EDIT(state, {id, name}){
			state.clients.find(c => c.id === id).name = name || `Client ${id + 1}`;
		},
		REMOVE(state, {id}){
			state.clients = state.clients.filter(c => c.id !== id);
		}
	},
	actions: {
		addClient({ commit }, payload) {
				commit('ADD', payload);
		},
		editClient({ commit }, payload) {
				commit('EDIT', payload);
		},
		removeClient({ commit, getters }, payload) {
				commit('REMOVE', payload);
				commit('productStore/REMOVE_CONSUMER', { ...payload, buyerChange: getters.getFirstClientID() }, { root: true })
		}
	}
}