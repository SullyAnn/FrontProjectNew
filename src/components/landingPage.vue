<template>
    <div class="landing-page">
        <Header ref="header" v-on:searchinputvalue="$emit('searchinputvalue',$event) "
                v-on:valueSelected="$emit('valueSelected', $event)"
                v-on:scoreGrade="$emit('scoreGrade', $event)"
                v-on:requestState="$emit('requestState')"
                v-on:isLanding="$emit('isLanding', $event)"
                v-on:disappear="launchDisappear"
        class="main-header" :isLandingPage="true"/>
    </div>
</template>

<script>
import Header from './Header.vue'


export default {
    name: 'LandingPage',
    props: {
        valueSelected: {type:String},
        scoreGrade: {type:String},
    },
    components: {
        Header,
    },
    methods: {
        changeSearchInput(){
            console.log("test landing page")
        },
        launchDisappear(value){
            this.$refs.header.disappear(value)
        }
        
    }
}
</script>


<style>

.landing-page{
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 10;
    transition: 0.5s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url('../assets/images/Main_BG.svg');
    background-repeat: no-repeat;
    background-attachment: fixed;

}
.main-header{
    text-align: center;
    height: 20vh;
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: unset;
    justify-content: space-between;
}
.main-header > h1 {
    font-size: 64px;
    color: white;
}
/*************  respponsive **************/
@media screen and (max-width: 600px) {
    .landing-page{
        background-size: cover;
    }
    .main-header{
        height: 30vh;
        justify-content: space-evenly;
    }
    .main-header > h1 {
        font-size: 42px;
    }
    .search-input{
        width: fit-content;
        border-bottom: 1px solid;
    }
    .search{
        flex-direction: column;
        height: 30vh;
        justify-content: space-around;
        border: none;
    }
    .button{
        position: absolute;
        left: -10px;
        top: 83px;
    }
    .loader{
        margin: 0;
        bottom: 0;
    }
}

</style>