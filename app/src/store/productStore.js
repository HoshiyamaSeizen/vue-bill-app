const Product = (id, name, price, buyer) => ({id, name, price, buyer, consumers: []})

export default {
    namespaced: true,
    state(){
        return {
            products: [...Array(10).keys()].map(id => Product(id, "Product "+ (id+1), 0, 0))
        }
    },
    mutations: {
        add(state, {name, price, buyer}) {
            state.products.push(Product(state.products[state.products.length-1]?.id+1 || 0, name, price, buyer));
        },
        edit(state, {id, name, price}){
            const product = state.products.find(p => p.id === id);
            product.name = name || `Product ${id+1}`;
            product.price = price;
        },
        remove(state, {id}){
            state.products = state.products.filter(c => c.id !== id);
        },
        editBuyer(state, {id, buyer}){
            state.products.find(p => p.id === id).buyer=buyer;
        },
        removeConsumer(state, {id, buyerChange}){
            state.products.forEach(product => {
                product.consumers = product.consumers.filter(c => c !== id);
                if(product.buyer === id) product.buyer = buyerChange;
            })
        },
        toggleConsumer(state, {id, client}){
            const consumers = state.products.find(p => p.id === id).consumers;
            const index = consumers.indexOf(client);
            index === -1 ? consumers.push(client) : consumers.splice(index, 1);
        },
        toggleAllConsumers(state, {id, clients}){
            const consumers = state.products.find(p => p.id === id).consumers
            const flag = consumers.length !== clients.length;
            consumers.splice(0, consumers.length)
            if(flag) clients.forEach(c => consumers.push(c.id));
        },
    },
    actions: {
        addProduct({ commit }, payload) {
            commit('add', payload);
        },
        editProduct({ commit }, payload) {
            commit('edit', payload);
        },
        removeProduct({ commit }, payload) {
            commit('remove', payload);
        },
        editBuyer({ commit }, payload) {
            commit('editBuyer', payload);
        },
        toggleConsumer({ commit }, payload) {
            commit('toggleConsumer', payload);
        },
        toggleAllConsumers({ commit }, payload) {
            commit('toggleAllConsumers', payload);
        }
    }
}