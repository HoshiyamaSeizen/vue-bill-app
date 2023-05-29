<script>
import { nextTick } from 'vue'
import { mapState, mapActions } from 'vuex'

export default{
    data() {
		return {
            result: [],
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
		<TransitionGroup tag="ul" name="list" class="product-list">
            <template v-for="{id, name, payed, owed} in result">
                <li class="list-item" v-if="payed > 0 || owed.length > 0" :key="id">
                    <p v-if="payed > 0" class="payment">
                        <span class="name">{{name}}</span>
                        pays 
                        <span class="money">${{payed.toFixed(2)}}</span>
                    </p>
                    <p v-for="lender in owed" class="debt">
                        <span class="name" :transparent="payed > 0">{{name}}</span> 
                        owes 
                        <span class="name">{{lender.name}}</span> 
                        <span class="money"> ${{lender.sum.toFixed(2)}}</span>
                    </p>
                </li>
            </template>
		</TransitionGroup>
        <router-link class="next-btn" to="/">New bill</router-link>
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
        transition: scale 200ms ease-out
        &.list-item
            p
                text-align: left
                margin-bottom: 0
                font-size: 1.5rem
            span[transparent="true"]
                color: transparent
            .name, .money
                font-weight: 700
            .money
                color: darkgreen
.next-btn
    display: block
    width: 300px
    margin: auto
    padding: 10px 20px
    transition: all 200ms ease
    @include no-select
    color: $color-secondary
    background-color: $color-main
    font-size: 1.3rem
    border-radius: 8px
    &:hover
        scale: 1.01
        background-color: lighten($color-main, 10%)
    &:active
        scale: 0.99
i.bi-check-lg
    font-size: 2rem
    &:hover
        color: darkgreen !important
i.bi-trash-fill:hover
    color: darkred !important
.i-pointer
    cursor: pointer
.list-move,
.list-enter-active,
.list-leave-active
    transition: all 300ms ease-out
.list-enter-from,
.list-leave-to
    opacity: 0
    scale: 1 0
    transform: translateX(30px)
</style>