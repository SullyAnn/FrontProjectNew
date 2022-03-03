<template>
    <section class="product-info-section">
        <h1 class="product-name">Name of the Product</h1>
        
        <ul class="product-info-list">
            <li> <strong> Quantity </strong> 
                <p class="product-quantity produt-li-elements"> 300 g </p>
            </li>
            <li> <strong> Brand </strong> 
                <p class="product-brand produt-li-elements"> 300 g </p>
            </li>
            <li> <strong> Components </strong> 
                <p class="product-component produt-li-elements"> 300 g </p>
            </li>
            <li> <strong> Additifs </strong> 
                <p class=" product-additifs produt-li-elements"> 300 g </p>
            </li>
            <li> <strong> Location </strong> 
                <p class="product-location produt-li-elements"> 300 g </p>
            </li>
        </ul>

    </section>
</template>

<script>
export default {
    name: 'ProductInfo',
}
</script>

<style>
.product-info-section{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
</style>