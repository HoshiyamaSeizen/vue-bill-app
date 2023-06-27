import { Store } from 'vuex'
import clientStore from './clientStore';
import productStore from './productStore';

export default new Store({
	modules: {
		clientStore,
		productStore
	}
})

