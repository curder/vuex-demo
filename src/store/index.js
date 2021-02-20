import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex)

export default new Vuex.Store({
    state: { // 类似 data
        products: []
    },

    getters: { // 类似 computed 属性
        availableProducts(state, getters) {
            return state.products.filter(product => product.inventory > 0);
        }
    },

    actions: { // 类似 methods
        fetchProduct() {
            //
        }
    },

    mutations: { //
        setProduct(state, products) {
            state.products = products;
        }
    }
});
