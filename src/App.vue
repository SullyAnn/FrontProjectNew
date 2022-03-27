<template>
  <section id="app">
    <LandingPage/>
    <Header :isLandingPage="false"/>

    <div v-if="listDisplay==true" class="product-displacement">
      <Product v-bind:productElement="product"  v-for="product in productDataSorted" :key="product.id"/>
      
      <div class="more">
        <button v-on:click="incrementPage()" class="more-button">more</button>
      </div>
      
    </div>

    <div v-else class="product-displacement">
      <Product v-bind:productElement="productData.product" />
    </div>

  </section>
</template>

<script>
import Header from './components/Header.vue'
import Product from './components/Product.vue'
import LandingPage from './components/landingPage.vue'


export default {
  name: 'App',
  components: {
    Header,
    Product,
    LandingPage,
  },
  data(){
        return{
            productDataSorted : [],
            productData : [],
            listDisplay: true,
            pageCount : 1,
            value : ""
        }
    },
    methods:{
      incrementPage(){
        this.pageCount ++
        this.$emit('pageCount', this.pageCount);
        this.$root.$on('value', data => {
          this.value = data
        })
        
      }
    },
    mounted() {
        this.$root.$on('productDataBySorting', data => {
        this.listDisplay = true;
        // on essaie de faire un bouton voir plus qui au clic lance la requete et si la page count > 1 alors on push ds le tableau sinon ça prend la valeur 
        if(this.pageCount > 1){
          this.productDataSorted.push(data.products)
        } else {
          this.productDataSorted = data.products;
          console.log(this.productDataSorted)
        }
        
        });

        this.$root.$on('productData', data => {
        this.listDisplay = false;
        this.productDataSorted = ""
        this.productData = data;
        console.log(this.productData)
        });
    },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&display=swap');

html, body{
  scroll-snap-type: y mandatory;
}

#app {
  font-family: Avenir, Helvetica, Arial, Barlow Condensed, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  justify-content: space-around;
  height: 100%;
  background-image: url("./assets/images/Vector.svg");
  background-repeat: no-repeat;
    background-size: 46%;
    background-attachment: fixed;
  background-position: top left;
}
.product-displacement{
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-inline: 150px;
    height: 100%;
}

.more{
 align-self: center;
    width: max-content;
    scroll-snap-align: start;
    border: none;
    background-color: unset;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-block: 20px;
}
.more-button{
  width: max-content;
  border: none;
  background-color: unset;
  text-transform: uppercase;
    cursor: pointer;
  color: #373737;
}

.more::after{
content: "";
    width: 0px;
    /* height: 2px; */
    border: 1px solid;
    /* color: #373737; */
    position: absolute;
    margin-top: 30px;
    transition: 0.5s ease;
}
.more:hover::after{
  width:50px;
}


</style>
