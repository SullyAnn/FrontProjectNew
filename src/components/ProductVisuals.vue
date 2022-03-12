<template>
    <section class="product-visuals-section">

        <div class="product-scores">
            <p class="nutri-score" v-if="productData.product.nutriscore_grade == 'a' "> <img src="@/assets/images/nutriscore_A.png"></p>
            <p class="nutri-score" v-else-if="productData.product.nutriscore_grade == 'b' "> <img src="@/assets/images/nutriscore_B.png"></p>
            <p class="nutri-score" v-else-if="productData.product.nutriscore_grade == 'c' "> <img src="@/assets/images/nutriscore_C.png"></p>
            <p class="nutri-score" v-else-if="productData.product.nutriscore_grade == 'd' "> <img src="@/assets/images/nutriscore_D.png"></p>
            <p class="nutri-score" v-else-if="productData.product.nutriscore_grade == 'e' "> <img src="@/assets/images/nutriscore_E.png"></p>

            <p class="eco-score" v-if="productData.product.ecoscore_grade == 'a' "> <img src="@/assets/images/ecoscore_A.png"></p>
            <p class="eco-score" v-else-if="productData.product.ecoscore_grade == 'b' "> <img src="@/assets/images/ecoscore_B.png"></p>
            <p class="eco-score" v-else-if="productData.product.ecoscore_grade == 'c' "> <img src="@/assets/images/ecoscore_C.png"></p>
            <p class="eco-score" v-else-if="productData.product.ecoscore_grade == 'd' "> <img src="@/assets/images/ecoscore_D.png"></p>
            <p class="eco-score" v-else-if="productData.product.ecoscore_grade == 'e' "> <img src="@/assets/images/ecoscore_E.png"></p>


            <p class="nova-score" v-if="productData.product.nova_group == '1' "> <img src="@/assets/images/novascore_1.png"></p>
            <p class="nova-score" v-else-if="productData.product.nova_group == '2' "> <img src="@/assets/images/novascore_2.png"></p>
            <p class="nova-score" v-else-if="productData.product.nova_group == '3' "> <img src="@/assets/images/novascore_3.png"></p>
            <p class="nova-score" v-else-if="productData.product.nova_group == '4' "> <img src="@/assets/images/novascore_4.png"></p>
        </div>

        <div class="product-svg">
            <img class ="" src="" alt="">      
        </div>

        <div class="product-image">
            <img :src="this.productData.product.image_front_url" alt="">
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
        console.log(this.productData.product.image_front_url)

        });
    }
}
</script>

<style>
.product-visuals-section{
    display: flex;
    justify-content: space-between;
    width: 50%;
    height: 100%;
    align-items: center;
}
.product-image > img{
    height: 415px;
}
.eco-score > img, .nova-score > img{
    width: 100px;
}
.nutri-score > img {
    width: 200px;
}
.eco-score, .nova-score, .nutri-score{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
}

.eco-score:after, .nova-score:after, .nutri-score:after{
    content: "";
    width: 15px;
    height: 15px;
    border-radius: 50%;
    margin-left: 40px;
    border : 5px solid #ECECEC;
}
.product-scores{
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    align-items: flex-end;
}

</style>