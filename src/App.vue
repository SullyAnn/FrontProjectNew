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
      <Product :productElement="product"  v-for="product in ProductOrganizedData" :key="product.id"/>
      <div v-if="isLandingPage==false">
        <SortProduct :productSortType.sync="productSortType" />
        <button v-on:click="seeMoreRequest" class="button" id="button-more"> more </button>
      </div>
    </div>

    <div v-else class="product-displacement">
      <Product :productElement="productData.product" />
    </div>
    <Footer/>
  </section>
</template>

<script>
import Header from './components/Header.vue'
import Product from './components/Product.vue'
import LandingPage from './components/landingPage.vue'
import SortProduct from './components/SortProduct.vue'
import Footer from './components/Footer.vue'
import {getProductById} from '@/services/api/requests.js'
import {getProductByNutriscore} from '@/services/api/requests.js'


export default {
  name: 'App',
  components: {
    Header,
    Product,
    LandingPage,
    SortProduct,
    Footer
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
            productSortType: localStorage.getItem("productSortType") || "AZName"
        }
    },
      watch: {
    productSortType: function(newValue){
      localStorage.setItem("productSortType", newValue)
    }
  }, 
    computed: {
      ProductOrganizedData(){
        let productDatas =  this.productDataSorted.products

        if(productDatas){
          const reversed = ['ZAName'].includes(this.productSortType)
          const comparator = (a,b) => a['product_name'].localeCompare(b['product_name'])
          productDatas = productDatas.sort(comparator)
          if(reversed) productDatas = productDatas.reverse()

        }     
          return productDatas  
          

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
        this.pageCount = 1
        console.log('apppppp')
            console.log("request has been sent by sorting")
            // PUT A SWITCH CASE
            switch (this.valueSelected) {
              case 'search-by-nutriscore':
                console.log('nutriscore');
                this.productDataSorted = await getProductByNutriscore(this.scoreGrade, this.pageCount)       
                break;
            }
        },

        async disappear(){
          this.$root.$emit('disappear', this.isLandingPage)
        },
        seeMoreWaiting(){
          document.getElementById('button-more').innerHTML = 'Loading ...';
        },
        seeMoreNormal(){
          document.getElementById('button-more').innerHTML = 'More';
        },

        async seeMoreRequest(){
          this.pageCount +=1
          this.seeMoreWaiting();
          let productDataSortedCopy = []
          let newProductsDataSorted = await getProductByNutriscore(this.scoreGrade, this.pageCount)
          this.seeMoreNormal()
          productDataSortedCopy =  this.productDataSorted.products.concat(newProductsDataSorted.products)
          this.productDataSorted.products = productDataSortedCopy
          console.log(productDataSortedCopy, "ESSSAII")
          console.log(this.productDataSorted, "ESSSAII 2")
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
 
}
.product-displacement{
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-inline: 150px;
    height: 100%;
    background-image: url("./assets/images/Vector.svg");
    background-repeat: no-repeat;
    background-size: 41%;
    background-attachment: fixed;
    background-position: top left;
    z-index: 0;
}

#button-more{
  position: fixed;
  bottom: 30px;
  right: 240px;
}

</style>
