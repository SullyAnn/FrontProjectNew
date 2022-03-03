<template>
  <section id="app">
    <Header/>
    <ProductInfo/>
    <ProductVisuals/>

  </section>
</template>

<script>
import Header from './components/Header.vue'
import ProductInfo from './components/ProductInfo.vue'
import ProductVisuals from './components/ProductVisuals.vue'

export default {
  name: 'App',
  components: {
    Header,
    ProductInfo,
    ProductVisuals, 
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
