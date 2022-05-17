<template>
    <section v-if="productItem" class="product-visuals-section">

        <div class="product-scores">
            <p class="nutri-score" v-if="productItem.nutriscore_grade == 'a' "> <img src="@/assets/images/nutriscore_A.png"></p>
            <p class="nutri-score" v-else-if="productItem.nutriscore_grade == 'b' "> <img src="@/assets/images/nutriscore_B.png"></p>
            <p class="nutri-score" v-else-if="productItem.nutriscore_grade == 'c' "> <img src="@/assets/images/nutriscore_C.png"></p>
            <p class="nutri-score" v-else-if="productItem.nutriscore_grade == 'd' "> <img src="@/assets/images/nutriscore_D.png"></p>
            <p class="nutri-score" v-else-if="productItem.nutriscore_grade == 'e' "> <img src="@/assets/images/nutriscore_E.png"></p>

            <p class="eco-score" v-if="productItem.ecoscore_grade == 'a' "> <img src="@/assets/images/ecoscore_A.png"></p>
            <p class="eco-score" v-else-if="productItem.ecoscore_grade == 'b' "> <img src="@/assets/images/ecoscore_B.png"></p>
            <p class="eco-score" v-else-if="productItem.ecoscore_grade == 'c' "> <img src="@/assets/images/ecoscore_C.png"></p>
            <p class="eco-score" v-else-if="productItem.ecoscore_grade == 'd' "> <img src="@/assets/images/ecoscore_D.png"></p>
            <p class="eco-score" v-else-if="productItem.ecoscore_grade == 'e' "> <img src="@/assets/images/ecoscore_E.png"></p>


            <p class="nova-score" v-if="productItem.nova_group == '1' "> <img src="@/assets/images/novascore_1.png"></p>
            <p class="nova-score" v-else-if="productItem.nova_group == '2' "> <img src="@/assets/images/novascore_2.png"></p>
            <p class="nova-score" v-else-if="productItem.nova_group == '3' "> <img src="@/assets/images/novascore_3.png"></p>
            <p class="nova-score" v-else-if="productItem.nova_group == '4' "> <img src="@/assets/images/novascore_4.png"></p>
        </div>

        <div class="product-svg">
            <img class ="" src="" alt="">      
        </div>

        <div class="product-image">
            <img :src="this.productItem.image_front_url" alt="">
        </div>

    </section>
</template>

<script>
export default {
    name: 'ProductVisuals',
    props: {
        productItem: {type:Object}
    },
  /*  data(){
        return{
            productItem : [],
        }
    },
   /* mounted(){
        this.productItem = this.productItem
    }

   /* mounted() {
        this.$root.$on('productItem', data => {
        this.productItem = data;
        });
    }*/
}
</script>

<style>
.product-visuals-section{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column-reverse;
    padding-top: 100px;
    width: 55%;
}
.product-image > img{
    object-fit: cover;
    width: inherit;
    height: inherit;
    object-position: center;
}
.eco-score > img, .nova-score > img{
    width: 80px;
}
.nutri-score > img {
    width: 220px;
}
.eco-score, .nova-score, .nutri-score{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
}

.eco-score:after, .nutri-score:after{
       content: "";
    /* width: 15px; */
    height: 79px;
    /* border-radius: 50%; */
    /* margin-left: 40px; */
    border: 2px solid #ECECEC;
    margin-inline: 40px;
}
.product-scores{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;
}

</style>