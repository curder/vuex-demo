import shop from "../api/shop";

export default { // 类似 methods，在组件中使用this.$store.dispatch('名称')调用
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
}
