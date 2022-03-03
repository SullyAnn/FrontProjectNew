<template>
    <header>

        <h1> FOOD INFO </h1>

        <div class="search">
            <input id="search-input" type="text" name="user" placeholder="Tap the product name of sort by score">
            <select id="search-by-score">
                <option value="search-by-nutriscore"></option>
                <option value="search-by-ecoscore"></option>
                <option value="search-by-novascore"></option>
            </select>
            <button  v-on:click="sendGetRequest()"  id="search-submit" type="submit">
                <img id ="search-image" src="../assets/search-icon.png">
            </button>
        </div>
 
    </header>    
</template>

<script>
// au clic sur l'icone rechercher ou touche Entrer on veut envoyer requete GET 
// on veut stocker l'input de l'utilisateur et le mettre dans une variable idProduct qui sera dans la requete que l'on va envoyer 
import {getProductById} from '@/services/api/requests.js'
import {getAllProducts} from '@/services/api/requests.js'
window.onload = getAllProducts();


export default {
    name: 'Header',
    props: {
		//firstname: {type: String, required: true},
		//breed: String, 
		//pictureUrl: {type: String, default:"https://my-best-kennel.com/pictures/default.png"}
	},
    data(){
        return{
            allProductsData: [],
            productData: [],
        }
    },
    methods: {
        async getAllProducts(){
            this.allProductsData = await getAllProducts();
            console.log(this.allProductsData)
        },

        async sendGetRequest() {
            let searchValue = document.getElementById('search-input').value
            console.log("request has been sent")
			this.productData = await getProductById(searchValue)
            this.$root.$emit('productData', this.productData);
		}
    }

}


</script>
 

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- props = attribut du component p -->
<style>
body{
    height: 100%;
    margin: 0;
}
h1{
    margin: 0;
}
header{
    background-color: #FFFAEC;
    padding-block: 20px;
    padding-inline: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;


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

</style>