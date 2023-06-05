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
            result: [],
            someonePays: false,
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
    created() {
        const ind = {}

        // Match ids to their indices in result array (faster than accessing by id) - O(n)
        this.clients.forEach(({id, name}, index) => {
            ind[id] = index;
            this.result.push({ id, name, payed: 0, consumed: 0, owed: [] })
        });

        // No elements in result means no persons added
        if(!this.result.length) return;

        // Calculate payed money and cost of consumed prouduct for each person - O(m)
        // If we didn't use id to index relation, it would be O(mn)
        this.products.forEach(({buyer, consumers, price}) => {
            this.result[ind[buyer]].payed += price;

            // If nobody ate the product then the buyer is considered a single consumer
            if(consumers.length === 0) return this.result[ind[buyer]].consumed += price;

            // Else devide the price between all consumers
            const dividedPrice = price / consumers.length;
            consumers.forEach(c => this.result[ind[c]].consumed += dividedPrice);
        })

        // Calculate difference in payed/consumed for each person and select a group with positive diff (lenders) - O(n)
        const lenders = []
        this.result.forEach(c => {
            c.diff = c.payed - c.consumed;
            if(c.payed) this.someonePays = true;
            if(c.diff > 0) lenders.push({id: c.id, debt: c.diff, name: c.name});
        })

        // Calculate the dept of each person - approx. O(mn) if assumed that the number of lenders is close to the number of buyers (or products)
        this.result.forEach(c => {
            if(c.diff >= 0) return;
            c.diff *= -1;

            // While the dept is more than 0 we try to pay it to one lender
            // The dept can be payed to one lender or to several lenders if the dept is bigger
            while(c.diff > 0.01){
                const l = lenders.at(-1);
                c.owed.push({ id: l.id, name: l.name });

                if(c.diff < l.debt){
                    c.owed.at(-1).sum = c.diff;
                    l.debt -= c.diff;
                    break;
                }else{
                    c.owed.at(-1).sum = l.debt;
                    c.diff -= l.debt;
                    lenders.pop();
                }
            }
        })
    },
}
</script>

<template>
    <div class="container">
		<h1>Result</h1>
        <List v-if="clients.length && products.length && someonePays">
            <template v-for="{id, name, payed, owed} in result">
                <li class="list-item" v-if="payed > 0 || owed.length > 0" :key="id">
                    <p v-if="payed > 0" class="payment">
                        <span class="name">{{name}}</span>
                        pays 
                        <span class="money">${{payed.toFixed(2)}}</span>
                    </p>
                    <p v-for="lender, index in owed" class="debt">
                        <span class="name" :transparent="payed > 0 || index > 0">{{name}}</span> 
                        owes 
                        <span class="name">{{lender.name}}</span> 
                        <span class="money"> ${{lender.sum.toFixed(2)}}</span>
                    </p>
                </li>
            </template>
        </List>
        <h4 class="info-message" v-else-if="clients.length && products.length">No one pays anything</h4>
        <h4 class="info-message" v-else>Persons or products were not added</h4>
        <router-link v-if="clients.length && products.length" class="next-btn" to="/">New bill</router-link>
        <router-link v-else-if="clients.length" class="next-btn" to="/products">Add products</router-link>
        <router-link v-else class="next-btn" to="/persons">Add persons</router-link>
	</div>
</template>

<style scoped lang="sass">
@import '../styles/_vars.sass'
.list-item
    overflow-x: hidden
    p
        text-align: left
        margin-bottom: 0
        font-size: 1.5rem
    span[transparent="true"]
        color: transparent
    .name, .money
        font-weight: 700
        @include limit-text
    .money
        color: darkgreen
</style>