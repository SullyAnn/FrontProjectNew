<template>
  <section id="app">
    <LandingPage/>
    <Header v-on:requestState="launchRequests" 
            @searchinputvalue="changeSearchInput" 
            :isLandingPage="isLandingPage" />

    <div v-if="listDisplay==true" class="product-displacement">
      <Product :productElement="product"  v-for="product in productDataSorted.products" :key="product.id"/>
    </div>

    <div v-else class="product-displacement">
      <Product :productElement="productData.product" />
    </div>

  </section>
</template>

<script>
import Header from './components/Header.vue'
import Product from './components/Product.vue'
import LandingPage from './components/landingPage.vue'
import {getProductById} from '@/services/api/requests.js'
import {getProductByNutriscore} from '@/services/api/requests.js'


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
            value : "",
            valueSelected: "",
            scoreGrade: "",
            searchInput: "",
            isLandingPage: true,
        }
    },
    mounted(){
      /*this.$on("valueSelected", data => {
        this.valueSelected = data;
        console.log("test app")
        console.log(this.valueSelected)
      }),
      this.$on("isLanding", data => {
        this.isLandingPage = data;
        console.log(data, "landigPage")
      })

      this.$on("scoreGrade", data => {
        this.listDisplay = true
        this.scoreGrade = data;
      })*/
      /*this.$on("requestState", () =>{
        this.launchRequests()
      })/*
      this.$on("searchInput", data => {
        this.listDisplay = false
        console.log(data)
        this.searchInput = data
      })*/
    },
    /*mounted() {
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
    },*/
    methods: {
      changeSearchInput(value){
          this.searchInput = value;
          this.listDisplay = false
          console.log(value, "searchInput in App ")
        },

      async sendGetRequestWithBareCode() {
        // envoie une requete avec le code barre
        this.listDisplay = false; 
                console.log("request has been sent with bare code")
                this.productData = await getProductById(this.searchInput)
                console.log(this.productData.product)
                
                //this.$root.$emit('productData', this.productData);
        },
        async sendGetRequestBySorting(){
        // envoie une requete par tri 
        this.listDisplay = true
        console.log('apppppp')
            console.log("request has been sent by sorting")
            this.productDataSorted = await getProductByNutriscore(this.scoreGrade, this.pageCount)       
        },
        async disapear(){
          this.$root.$emit("test2", this.isLandingPage)
        },


        launchRequests(){
        // lance les requetes par code bare ou par tri
            let myFunction;
            console.log("launchRequest")


            if(this.searchInput!=""){
                myFunction = this.sendGetRequestWithBareCode
            } else if (this.valueSelected!="" && this.searchInput=="") {
                myFunction = this.sendGetRequestBySorting
            } 
            this.$emit("spinner")
    
            myFunction((this.scoreGrade, this.pageCurrent)).then(() => this.disapear());
            this.searchInput = ""
        },

        
      
    }
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
    background-size: 41%;
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


</style>
