<template>
  <div>
    <h1>Product List</h1>
    <ul v-if="!loading">
      <li v-for="product in products" :key="product.id" v-text="`${product.title} - ${product.price}`"></li>
    </ul>
    <p v-else>Loading...</p>
  </div>
</template>
<script>
export default {
  computed: {
    products() {
      return this.$store.state.products;
    }
  },

  data() {
    return {
      loading: false,
    };
  },

  created() {
    this.loading = true;
    this.$store.dispatch('fetchProduct').then(() => this.loading = false);
  },
}
</script>
