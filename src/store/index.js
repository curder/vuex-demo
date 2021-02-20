import Vuex from 'vuex';
import Vue from 'vue';
import shop from "../api/shop";

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
        fetchProduct({commit}) {
            return new Promise((resolve, reject) => {
                shop.getProducts(products => {
                    commit('setProduct', products);
                    resolve();
                })
            })
        },
    },

    mutations: { // 类似 事件
        setProduct(state, products) {
            state.products = products;
        }
    }
});
