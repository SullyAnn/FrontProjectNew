<template>
    <section class="product-info-section">
        <h1 class="product-name">{{productData.product.product_name}}</h1>
        
        <ul class="product-info-list">
            <li> <strong> Quantity </strong> 
                <p class="product-quantity product-li-elements"> {{productData.product.quantity}} </p>
            </li>
            <li> <strong> Brand </strong> 
                <p class="product-brand produt-li-elements"> {{productData.product.brands}} </p>
            </li>
            <li> <strong> Components </strong> 
                <ul class="product-array">
                    <li class="product-component product-li-elements" > {{productData.product.ingredients_text}} </li>
                </ul>
            </li>
            <li> <strong> Additives </strong> 
                <p v-if="productData.product.additives_n == 0"> None </p>
                <ul class="product-array" v-else>
                    <li class=" product-additifs product-li-elements" v-for="item in productData.product.additives_tags" :key="item"> {{item}} </li>
                </ul>
    
            </li>
            <li> <strong> Location </strong> 
                <p class="product-location product-li-elements"> {{productData.product.countries_imported}} </p>
            </li>
        </ul>

    </section>
</template>

<script>
export default {
    name: 'ProductInfo',
    data(){
        return{
            productData : [],
        }
    },

    mounted() {
        this.$root.$on('productData', data => {
        this.productData = data;
        });
    }
}
</script>

<style>
.product-name{
    font-family: 'Barlow Condensed';
    font-weight: 900;
    font-size: 40px;
    text-align: left;
}
.product-info-section{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 350px;
}
.product-info-list{
    list-style-type: none;
    padding: 0;
    text-align: start;
    margin-block: 40px;
}
.product-info-list li{
    flex-direction: row;
    display: flex;
    align-items: center;
}
.product-info-list strong{
    margin-right: 16px;
}
.product-array{
    display: flex;
    flex-wrap: wrap;
    padding: 0;
}
li > p {
    margin: 0;
}
</style>