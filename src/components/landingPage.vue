<template>
    <div class="landing-page">
        <Header class="main-header" :isLandingPage="true"/>
    </div>
</template>

<script>
import Header from './Header.vue'


export default {
    name: 'LandingPage',
    components: {
        Header,
    },
    methods: {
        
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
}
.main-header > h1 {
    font-size: 64px;
    color: white;
}

</style>