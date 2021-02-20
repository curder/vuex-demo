import shop from "../../api/shop";

export default {
    state: { // 类似 data
        items: [],
        checkoutStatus: null,
    },

    getters: { // 类似 computed 属性
        cartProducts(state, getters, rootState) {
            return state.items.map(cartItem => {
                const product = rootState.products.items.find(item => item.id === cartItem.id)
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
    },

    mutations: { // 类似 事件，使用 state.commit(名称) 调用
        pushProductToCart(state, productId) {
            state.items.push({
                id: productId,
                quantity: 1,
            })
        },


        incrementItemQuantity(state, cartItem) {
            cartItem.quantity++
        },

        setCheckoutStatus(state, status) {
            state.checkoutStatus = status
        },

        emptyCart(state) {
            state.items = []
        },
    },

    actions: { // 类似于方法，在组件中使用 this.$state.dispatch 调用或使用mapActions导入方法
        addProductToCart({getters, commit, state, rootState}, product) {
            if (getters.productIsInStock(product)) {
                const cartItem = state.items.find(item => item.id === product.id)

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
                state.items,
                () => {
                    commit('emptyCart')
                    commit('setCheckoutStatus', 'success')
                },
                () => {
                    commit('setCheckoutStatus', 'fail')
                }
            )
        }
    }
}
