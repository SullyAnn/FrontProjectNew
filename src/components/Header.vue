<template>
    <header>

        <h1> FOOD INFO </h1>

        <div class="search">
            <input v-model="searchInput"  id="search-input" type="text" name="user" placeholder="Tap the product name of sort by score">
            <select v-on:click="sortByNutriscore()" id="search-by-score">
                <option value="search-by-nutriscore">nutriscore</option>
                <option value="search-by-ecoscore">ecoscore</option>
                <option value="search-by-novascore">novascore</option>
            </select>
            <select class="scores" v-model="scoreGrade" v-if="valueSelected == 'search-by-nutriscore'">
                <option value="a">A</option>
                <option value="b">B</option>
                <option value="c">C</option>
                <option value="d">D</option>
                <option value="e">E</option>
            </select>

            <button  v-if="isLandingPage" v-on:click="launchRequests() "  id="search-submit" type="submit">
                <img id ="search-image" src="../assets/images/search-icon.png">
            </button>

             <button  v-else v-on:click="sendGetRequestWithBareCode(); sendGetRequestBySorting(scoreGrade); "  id="search-submit" type="submit">
                <img id ="search-image" src="../assets/images/search-icon.png">
            </button>
        </div>
 
    </header>    
</template>

<script>
// au clic sur l'icone rechercher ou touche Entrer on veut envoyer requete GET 
// on veut stocker l'input de l'utilisateur et le mettre dans une variable idProduct qui sera dans la requete que l'on va envoyer 
import {getProductById} from '@/services/api/requests.js'
import {getProductByNutriscore} from '@/services/api/requests.js'



export default {
    name: 'Header',
    props: {
        isLandingPage: {type:Boolean},
	},
    data(){
        return{
            productData: [],
            searchInput: "",
            valueSelected: "",
            scoreGrade: "",
            pageCurrent: 1
        }
    },
   
    methods: {
        //mettre tout ça dans app et faire remonter info dans l'app ou tout mettre ds un fihcier JS 
        async sendGetRequestWithBareCode() {
           // if(this.searchInput!=""){
                console.log("request has been sent with bare code")
                this.productData = await getProductById(this.searchInput)
                this.$root.$emit('productData', this.productData);
          //  }
        },
        async sendGetRequestBySorting(value, pageCurrent){
            //IF SENT BY SORTING
                //value = this.scoreGrade
                console.log(this.scoreGrade)
                //if(this.valueSelected!="" && this.searchInput==""){
                
                console.log("request has been sent by sorting")
                console.log(value)
             //   pageCurrent = this.pageCurrent
                this.productData = await getProductByNutriscore(value, pageCurrent)
                this.$root.$emit('productDataBySorting', this.productData);
                
        }, /*
         async sendNextPage(value, pageCurrent){
            //IF SENT BY SORTING
                value = this.scoreGrade
                console.log(this.scoreGrade)
                if(this.valueSelected!="" && this.searchInput==""){
                pageCurrent = this.pageCurrent
                console.log("request has been sent by sorting ++")
                this.productData = await getProductByNutriscore(value)
                this.productData
                this.$root.$emit('productDataBySorting', this.productData);
                }    */

        sortByNutriscore(){
            let value =  document.getElementById('search-by-score').value
            this.valueSelected = value
            this.searchInput = ""
        },
        disappear(){

            //lancer une fois que la requet asynchrone
            let loader = document.querySelector('.loader')
            loader.parentElement.removeChild(loader);

            let landing = document.querySelector(".landing-page");
            let landingHeader = document.querySelector(".main-header");

            landingHeader.style.display = 'none'
            landing.style.height ='0'
        
        },        
        
        launchRequests(){
            let myFunction;

            if(this.searchInput!=""){
                myFunction = this.sendGetRequestWithBareCode
            } else if (this.valueSelected!="" && this.searchInput=="") {
                myFunction = this.sendGetRequestBySorting
            } 
            //ajouter loader 
            this.createSpinner();
            myFunction(this.scoreGrade, this.pageCurrent).then(this.disappear)
        },
        createSpinner(){
           let spinner =  document.createElement('div')
            let header = document.querySelector('header')
            header.appendChild(spinner)

           spinner.classList.add('loader')
           console.log('spinner')
           console.log(spinner)
        }
        
    },

}


</script>
 

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- props = attribut du component p -->

<style>
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&display=swap');

body{
    height: 100%;
    margin: 0;
}
h1{
    margin: 0;
}
header{
    font-family: 'Barlow Condensed';
    font-weight: 800;
    padding: 20px 40px;
    display: flex;
    align-items: center;
    position: fixed;
    width: 50%;
    right: 0;
    justify-content: space-between;
    background-color: white;
}

.search{
    border-bottom: 1px solid grey;
}

#search-submit{
    border: none;
    background-color: rgba(255,255,255,0);
    width: 48px;
    height: 48px;
    cursor: pointer;
}

#search-by-score{
    border: none;
    background-color: rgba(255,255,255,0);
}
#search-input{
    width: 400px;
    border: none;
    background-color: rgba(255,255,255,0);
    height: 40px;
    font-size: 16px;
}
#search-image{
    width: 24px;
}

.loader,
.loader:before,
.loader:after {
  border-radius: 50%;
  width: 2.5em;
  height: 2.5em;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation: load7 1.8s infinite ease-in-out;
  animation: load7 1.8s infinite ease-in-out;
}
.loader {
  color: #ffffff;
  font-size: 10px;
  margin: 200px auto;
  position: absolute;
  text-indent: -9999em;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}

.loader:before,
.loader:after {
  content: '';
  position: absolute;
  top: 0;
}
.loader:before {
  left: -3.5em;
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}
.loader:after {
  left: 3.5em;
}
@-webkit-keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}
@keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}

</style>