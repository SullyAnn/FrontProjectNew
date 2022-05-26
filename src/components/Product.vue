<template>
    <section class="content">
        <ProductInfo :productItem="productElement"/>
        <ProductVisuals :productItem="productElement"/>
    </section>
</template>

<script>
import ProductInfo from './ProductInfo.vue'
import ProductVisuals from './ProductVisuals.vue'

export default {
    name: 'Product',
    components: {
        ProductInfo,
        ProductVisuals,
    },
    props: {
        productElement: {type: Object}
    }
}
</script>

<style>
.content{
   display: flex;
    flex-direction: row;
    padding: 0;
    align-items: flex-end;
    height: 100vh;
    justify-content: space-between;
    align-items: center;
    scroll-snap-align: start;
   
}

@media screen and (max-width: 600px) {
    .content{
        flex-direction: column;
    }
}

</style>