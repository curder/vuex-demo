import shop from "../../api/shop";

export default {
    state: { // 类似 data
        items: [],
    },

    getters: { // 类似 computed 属性
        availableProducts(state, getters) {
            return state.items
        },


        productIsInStock() {
            return (product) => {
                return product.inventory > 0
            }
        }
    },

    mutations: { // 类似 事件，使用 state.commit(名称) 调用
        setProduct(state, products) {
            state.items = products
        },

        decrementProductInventory(state, product) {
            product.inventory--
        },
    },

    actions: { // 类似于方法，在组件中使用 this.$state.dispatch 调用或使用mapActions导入方法
        fetchProduct({commit}) {
            return new Promise((resolve) => {
                shop.getProducts(products => {
                    commit('setProduct', products)
                    resolve()
                })
            })
        }
    },
}
