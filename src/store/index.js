import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex)

new Vuex.Store({
    state: { // 类似 data
        products: []
    },

    getters: { // 类似 computed 属性
        productsCount() {
            //
        }
    },

    actions: { // 类似 methods
        fetchProduct() {
            //
        }
    },

    mutations: { //
        setProduct(state, products) {
            //
        }
    }
});
