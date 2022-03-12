<template>
  <section id="app">
    <Header/>

    <div id="content">
      <ProductInfo/>
      <ProductVisuals/>
    </div>
    

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
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&display=swap');


#app {
  font-family: Avenir, Helvetica, Arial, Barlow Condensed, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#content{
    display: flex;
    justify-content: space-between;
    padding-inline: 100px;
    align-items: center;
    height: 90vh;
    background-image: url("./assets/images/background.png");
    background-repeat: no-repeat;
    background-size: 80% 125%;
    background-position: bottom left;
}
</style>
