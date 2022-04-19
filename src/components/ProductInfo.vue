<template>
    <section class="product-info-section">
        <h1 class="product-name">{{productItem.product_name}}</h1>
        
        <ul class="product-info-list">
            <li> <strong> Quantity </strong> 
                <p class="product-quantity product-li-elements"> {{productItem.quantity}} </p>
            </li>
            <li> <strong> Brand </strong> 
                <p class="product-brand produt-li-elements"> {{productItem.brands}} </p>
            </li>
            <li> <strong> Allergens </strong> 
                <p v-if="productItem.allergens == ''"> None </p>
                <ul class="product-array" v-else>
                    <li class="product-component product-li-elements" > {{productItem.allergens.replaceAll("en:","")}} </li>
                </ul>
            </li>
            <li> <strong> Additives </strong> 
                <p v-if="productItem.additives_n == 0"> None </p>
                <ul class="product-array" v-else>
                    <li class=" product-additifs product-li-elements" v-for="item in productItem.additives_tags" :key="item">{{item.replace('en:', '')}}&nbsp; </li>
                </ul>
    
            </li>
            <li> <strong> Location </strong> 
                <p v-if="productItem.countries_imported == '' "> None </p>
                <p class="product-location product-li-elements" v-else> {{productItem.countries_imported}} </p>
            </li>
        </ul>

    </section>
</template>

<script>
export default {
    name: 'ProductInfo',
    props: {
        productItem: {type:Object, required:true}
    },
   /* data(){
        return{
            productData : [],
        }
    },
      mounted(){
        this.productData = this.productItem
    }

   /* mounted() {
        this.$root.$on('productData', data => {
        this.productData = data;
        });
    }*/
}
</script>

<style>
.product-name{
    font-family: 'Barlow Condensed';
    font-weight: 800;
    font-size: 54px;
    text-align: left;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: white;
    line-height: 1em;
}
.product-info-section{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 450px;
    justify-content: center;
}
.product-info-list{
    list-style-type: none;
    padding: 0;
    text-align: start;
    margin-block: 60px;
    line-height: 2em;
}
.product-info-list li{
    flex-direction: row;
    display: flex;
    align-items: center;
}
.product-info-list strong{
    margin-right: 16px;
    font-size: 18px;
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