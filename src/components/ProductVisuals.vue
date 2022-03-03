<template>
    <section class="product-visuals-section">

        <div class="product-scores">
            <p class="nutri-score"> <strong> Nutri-score </strong> </p>
            <p class="eco-score"> <strong> eco-score </strong> </p>
            <p class="nova-score"> <strong> nova-score </strong> </p>
        </div>

        <div class="product-svg">
            <img class ="" src="" alt="">      
        </div>

        <div class="product-image">
            <img :src="this.productData.product.image_front_small_url" alt="">
        </div>

    </section>
</template>

<script>
export default {
    name: 'ProductVisuals',
    data(){
        return{
            productData : [],
        }
    },

    mounted() {
        this.$root.$on('productData', data => {
        this.productData = data;
        console.log(this.productData);
        console.log(this.productData.product.image_front_small_url)

        });
    }
}
</script>

<style>

</style>