<template>
  <section id="app">
    <LandingPage ref='header'  v-on:searchinputvalue="changeSearchInput"
                  v-on:valueSelected="changeValueSelected"
                  v-on:scoreGrade="changeScoreGrade"
                  v-on:requestState="launchRequests"
                  v-on:isLanding="changeLandingPage"/>
    <Header ref='header' :isLandingPage="isLandingPage" 
                  v-on:searchinputvalue="changeSearchInput"
                  v-on:valueSelected="changeValueSelected"
                  v-on:scoreGrade="changeScoreGrade"
                  v-on:requestState="launchRequests"/>

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
            isLandingPage: false,
        }
    },
    methods: {
      changeSearchInput(value){
          this.searchInput = value;
          this.listDisplay = false
          console.log(value, "searchInput in App ")
        },
      changeValueSelected(value){
        this.valueSelected = value
      },
      changeScoreGrade(value){
        this.scoreGrade = value
      },
      changeLandingPage(value){
        this.isLandingPage = value;
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
        async disappear(){
          this.$root.$emit('disappear', this.isLandingPage)
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
            console.log(this.valueSelected)
            console.log(myFunction)
            myFunction((this.scoreGrade, this.pageCurrent)).then(() => this.disappear());
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
