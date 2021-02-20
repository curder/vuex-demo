<template>
  <div>
    <h1>Product List</h1>
    <ul v-if="!loading">
      <li v-for="product in products" :key="product.id">
        {{ product.title }} - {{ product.price | currency }} - {{ product.inventory }}

        <button :disabled="!productIsInStock(product)" @click="addProductToCart(product)">Add Cart</button>
      </li>
    </ul>
    <p v-else>Loading...</p>
  </div>
</template>
<script>
import {mapActions, mapGetters, mapState} from 'vuex'

export default {

  computed: {
    ...mapState({
      products: state => state.products.items,
    }),
    ...mapGetters('products', {
      productIsInStock: 'productIsInStock',
    })
  },
  data() {
    return {
      loading: false,
    }
  },

  created() {
    this.loading = true
    this.fetchProduct().then(() => this.loading = false)
  },

  methods: {
    ...mapActions('products', {
      fetchProduct: 'fetchProduct',
    }),
    ...mapActions('cart', {
      addProductToCart: 'addProductToCart',
    })
  },
}
</script>
