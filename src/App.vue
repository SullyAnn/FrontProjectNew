<template>
  <section id="app">
    <LandingPage ref='header'  v-on:searchinputvalue="changeSearchInput"
                  v-on:valueSelected="changeValueSelected"
                  v-on:scoreGrade="changeScoreGrade"
                  v-on:requestState="launchRequests"
                  v-on:isLanding="changeLandingPage"/>
    <Header v-if="isLandingPage" ref='header' :isLandingPage="isLandingPage" 
                  v-on:searchinputvalue="changeSearchInput"
                  v-on:valueSelected="changeValueSelected"
                  v-on:scoreGrade="changeScoreGrade"
                  v-on:requestState="launchRequests"/>
    <Header v-responsive.lg.xl ref='header' :isLandingPage="isLandingPage" 
                  v-on:searchinputvalue="changeSearchInput"
                  v-on:valueSelected="changeValueSelected"
                  v-on:scoreGrade="changeScoreGrade"
                  v-on:requestState="launchRequests"/>

    <div v-if="listDisplay==true" class="product-displacement">
      <Product :productElement="product"  v-for="product in ProductOrganizedData" :key="product.id"/>
      <div v-if="isLandingPage==false">
        <SortProduct v-responsive.lg.xl :productSortType.sync="productSortType" />
        <button v-on:click="seeMoreRequest" class="button" id="button-more"> more </button>
      </div>  
    </div>

    <div v-else class="product-displacement">
      <Product :productElement="productData.product" />
    </div>
    
    <button v-responsive.sm.xs id="button-search" class="button" v-on:click="openHeader"> Search </button>

    <Footer v-responsive.lg.xl/>
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
        // Sort Data by AZ or ZA name
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
        this.listDisplay = false; 
        this.productData = await getProductById(this.searchInput)                
      },
      async sendGetRequestBySorting(){
        this.listDisplay = true
        this.pageCount = 1
        // In case I want to add more input button
        switch (this.valueSelected) {
          case 'search-by-nutriscore':
            this.productDataSorted = await getProductByNutriscore(this.scoreGrade, this.pageCount)       
            break;
          }
        },
        async disappear(){
          this.$root.$emit('disappear', this.isLandingPage)
        },
        seeMoreWaiting(){
          document.getElementById('button-more').innerHTML = 'Loading';
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
        },
        launchRequests(){
          let myFunction;
          if(this.searchInput!=""){
              myFunction = this.sendGetRequestWithBareCode
          } 
          else if (this.valueSelected!="" && this.searchInput=="") {
            myFunction = this.sendGetRequestBySorting
          } 
          this.$emit("spinner")
          myFunction((this.scoreGrade, this.pageCurrent)).then(() => this.disappear());
          this.searchInput = ""
        },
        openHeader(){
          let landing = document.querySelector(".landing-page");
          let landingHeader = document.querySelector(".main-header");
          let loader = document.querySelectorAll('.loader');
          loader.forEach(element => element.style.display="none")
          landingHeader.style.display = 'block'
          landing.style.height ='100%'
        }          
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
@media screen and (max-width: 600px) {
  .product-displacement{
    padding: 20px;
    background-image: url('./assets/images/Main_BG.svg'); 
    background-size: 200%;
  }
  #button-search{
    top: unset;
    left: 0;
    bottom: 0;
    position: fixed;

  }
  #button-more{
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 80px;
      top:unset;
      left: 0;
      bottom: 35px;
  }
}

</style>
