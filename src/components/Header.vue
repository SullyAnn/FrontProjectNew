<template>
    <header>
        
        <!--- Titre Landing page --->
        <h1 v-if="isLandingPage" v-responsive.lg.xl> FOOD INFO </h1>
        <h1 v-if="isLandingPage" v-responsive.sm.xs id="responsive-header-title"> FOOD INFO </h1>

        <!--- Titre Content page --->
        <h1 v-else class="header-content"> FOOD INFO</h1>

        <div class="search">
            <button v-if="searchInput" @click="clearSearch"> Clear </button>
            <input v-model="searchInput"  class="search-input" type="text" name="user" placeholder="Tap the product name of sort by score">
            <select v-model="valueSelected"  id="search-by-score">
                <option disabled value=""> Option de tri </option>
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

            <button v-if="isLandingPage" 
            
                v-on:click="changeRequestState" id="search-submit" type="submit">
                <img id ="search-image" src="../assets/images/search-icon.png">
            </button>

            <button  v-else 
                v-on:click="changeRequestState(); loadingPage()"  id="search-submit" type="submit">
                <img id ="search-image" src="../assets/images/search-icon.png">
            </button>
        </div>
        <div v-if="!isLandingPage" class="loading-page"></div>
 
    </header>    
</template>

<script>
// au clic sur l'icone rechercher ou touche Entrer on veut envoyer requete GET 
// on veut stocker l'input de l'utilisateur et le mettre dans une variable idProduct qui sera dans la requete que l'on va envoyer 
/*import {getProductById} from '@/services/api/requests.js'
import {getProductByNutriscore} from '@/services/api/requests.js'*/



export default {
    name: 'Header',
    props: {
        isLandingPage: {type:Boolean},
    },
    data(){
        return{
            searchInput: "",
            pageCurrent: 1,
            valueSelected:"",
            scoreGrade: "",
            isRequestLaunched: false,
        }
    },  
    mounted(){
        this.$root.$on("disappear", () => {
            this.disappear()
        })
    },
    methods: {
        onValueSelectedChanged(){
        //this.valueSelected = event.target.value
            this.$emit('valueSelected', this.valueSelected)
            console.log("emit value")
            console.log(this.valueSelected)
        },
        onScoreGradeChanged(){
            this.$emit('scoreGrade', this.scoreGrade)
            console.log ("emit score")

           // console.log(this.scoreGrade)
        },
        changeRequestState(){
           this.isRequestLaunched = true
           // réunir les functions ds un tableau

            if(this.searchInput!=""){
                this.onInputChanged()
           } else if (this.valueSelected!="" && this.searchInput==""){
                this.onValueSelectedChanged(this.valueSelected)
                this.onScoreGradeChanged(this.scoreGrade)
           }
           this.$emit("requestState")
           this.$emit('isLanding', false)
            console.log('changeRequestState')
            console.log(this.valueSelected)
            console.log(this.scoreGrade)
            this.createSpinner()
            
            //console.log(this.isRequestLaunched)
        },
        onInputChanged: function(){
            this.$emit("searchinputvalue", this.searchInput)
            console.log(this.searchInput)
        },


        disappear(isLanding){
        // fait disparaitre les pages de chargement 
            isLanding = this.isLandingPage 
            let loadingPage =  document.querySelector('.loading-page')
            let loader = document.querySelector('.loader')
        // si Landing page
            if(isLanding){
                let landing = document.querySelector(".landing-page");
                let landingHeader = document.querySelector(".main-header");

                landingHeader.style.display = 'none'
                landing.style.height ='0'
            } else {
        // si page de chargement
                loadingPage.classList.replace('loading-in','loading-out')
                if (loader.parentNode) {
                loader.parentNode.removeChild(loader);
                }
            }        
        }, 
        /*launchRequests(){
        // lance les requetes par code bare ou par tri
            let myFunction;

            if(this.searchInput!=""){
                myFunction = this.sendGetRequestWithBareCode
            } else if (this.valueSelected!="" && this.searchInput=="") {
                myFunction = this.sendGetRequestBySorting
            } 
            this.createSpinner();
            myFunction(this.scoreGrade, this.pageCurrent).then(this.disappear)
        },*/
        createSpinner(){
        // crée un loader qui permet de faire patienter l'utilisateur
            let spinner =  document.createElement('div')
            let header = document.querySelector('header')
            header.appendChild(spinner)
            spinner.classList.add('loader')
        },
        loadingPage(){
        // crée une page de chargement 
            let loadingPage =  document.querySelector('.loading-page')
            let spinner =  document.createElement('div')
            spinner.classList.add('loader')

            console.log(loadingPage)
            if(loadingPage.classList.contains('loading-out')){
                loadingPage.classList.replace('loading-out', 'loading-in')
                loadingPage.appendChild(spinner)
            }else{
                loadingPage.classList.add('loading-in')
                loadingPage.appendChild(spinner)
            }
        }, 
        clearSearch(){
            this.searchInput =""
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
    width: 55%;
    right: 0;
    justify-content: center;
    background-color: white;
}
.header-content {
    position: fixed;
    left: 150px;
}

.search{
    border-bottom: 1px solid grey;
    display: flex;
    align-items: center;
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
.search-input{
    width: 400px;
    border: none;
    background-color: rgba(255,255,255,0);
    height: 40px;
    font-size: 16px;
}
#search-image{
    width: 24px;
}
/*---------------- LOADING PAGE  ---------------*/
.loading-page{
   position: fixed;
    overflow: hidden;
    height: 100vh;
    width: 0px;
    z-index: 20;
    top: 0;
    left: 0;
    background-color: #B8E8A7;
    transition: 0.5s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    color:white;
    font-size: 48px;

}
.loading-in{
    width: 100vw;
}
.loading-out{
    width: 0;
}


/*---------------- LOADER ELEMENT  ---------------*/

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

/*---------------- RESPONSIVE  ---------------*/


#responsive-header-title{
    font-size: 24px;
}
</style>