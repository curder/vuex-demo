import Vuex from 'vuex'
import Vue from 'vue'
import shop from "../api/shop"

Vue.use(Vuex)

export default new Vuex.Store({
    state: { // 类似 data
        products: [],
        cart: [],
        checkoutStatus: null,
    },

    getters: { // 类似 computed 属性
        availableProducts(state, getters) {
            return state.products //.filter(product => getters.productIsInStock(product))
        },

        cartProducts(state) {
            return state.cart.map(cartItem => {
                const product = state.products.find(item => item.id === cartItem.id)
                return {
                    title: product.title,
                    price: product.price,
                    quantity: cartItem.quantity,
                }
            })
        },

        cartTotal(state, getters) {
            return getters.cartProducts.reduce((total, product) => total + product.quantity * product.price, 0)
        },

        productIsInStock() {
            return (product) => {
                return product.inventory > 0
            }
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

        addProductToCart({getters, commit, state}, product) {
            if (getters.productIsInStock(product)) {
                const cartItem = state.cart.find(item => item.id === product.id)

                if (!cartItem) {
                    commit('pushProductToCart', product.id)
                } else {
                    commit('incrementItemQuantity', cartItem)
                }

                commit('decrementProductInventory', product)
            }
        },

        checkout({state, commit}) {
            shop.buyProducts(
                state.cart,
                () => {
                    commit('emptyCart')
                    commit('setCheckoutStatus', 'success')
                },
                () => {
                    commit('setCheckoutStatus', 'fail')
                }
            )
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

        setCheckoutStatus(state, status) {
            state.checkoutStatus = status
        },

        emptyCart(state) {
            state.cart = []
        },
    }
})
