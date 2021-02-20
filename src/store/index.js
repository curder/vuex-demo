import Vuex from 'vuex'
import Vue from 'vue'
import shop from "../api/shop"

Vue.use(Vuex)

export default new Vuex.Store({
    state: { // 类似 data
        products: [],
        cart: [],
    },

    getters: { // 类似 computed 属性
        availableProducts(state) {
            return state.products.filter(product => product.inventory > 0)
        }
    },

    actions: { // 类似 methods，在组件中使用this.$store.dispatch('名称')调用
        fetchProduct({commit}) {
            return new Promise((resolve) => {
                shop.getProducts(products => {
                    commit('setProduct', products)
                    resolve()
                })
            })
        },

        addProductToCart(context, product) {
            if (product.inventory > 0) {
                const cartItem = context.state.cart.find(item => item.id === product.id)

                if (!cartItem) {
                    context.commit('pushProductToCart', product.id)
                } else {
                    context.commit('incrementItemQuantity', cartItem)
                }

                context.commit('decrementProductInventory', product)
            }
        }
    },

    mutations: { // 类似 事件，使用 state.commit(名称) 调用
        setProduct(state, products) {
            state.products = products
        },

        pushProductToCart(state, productId) {
            state.cart.push({
                id: productId,
                quantity: 1,
            })
        },

        incrementItemQuantity(state, cartItem) {
            cartItem.quantity++
        },

        decrementProductInventory(state, product) {
            product.inventory--
        },
    }
})
