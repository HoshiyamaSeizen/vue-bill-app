const Client = (id, name) => ({id, name})

export default {
  namespaced: true,
  state() {
    return {
      clients: [...Array(10).keys()].map(id => Client(id, "John Doe "+(id+1)))
    }
  },
  getters: {
    getFirstClientID: state => () => state.clients[0]?.id || 0
  },
  mutations: {
    add(state, {name}) {
      state.clients.push(Client(state.clients[state.clients.length-1]?.id+1 || 0, name));
    },
    edit(state, {id, name}){
      state.clients.find(c => c.id === id).name = name || `Client ${id+1}`;
    },
    remove(state, {id}){
      state.clients = state.clients.filter(c => c.id !== id);
    }
  },
  actions: {
    addClient({ commit }, payload) {
        commit('add', payload);
    },
    editClient({ commit }, payload) {
        commit('edit', payload);
    },
    removeClient({ commit, getters }, payload) {
        commit('remove', payload);
        commit('productStore/removeConsumer', { ...payload, buyerChange: getters.getFirstClientID() }, { root: true })
    }
  }
}