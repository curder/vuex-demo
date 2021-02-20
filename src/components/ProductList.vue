<template>
  <div>
    <h1>Product List</h1>
    <ul v-if="!loading">
      <li v-for="product in products" :key="product.id">
        {{ product.title }} - {{ product.price | currency }} - {{ product.inventory }}

        <button @click="addProductToCart(product)">Add Cart</button>
      </li>
    </ul>
    <p v-else>Loading...</p>
  </div>
</template>
<script>
export default {
  computed: {
    products() {
      return this.$store.getters.availableProducts
    }
  },

  data() {
    return {
      loading: false,
    }
  },

  created() {
    this.loading = true
    this.$store.dispatch('fetchProduct').then(() => this.loading = false)
  },

  methods: {
    addProductToCart(product) {
      this.$store.dispatch('addProductToCart', product)
    }
  },
}
</script>
