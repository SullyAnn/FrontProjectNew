// ----------------------------------------- REQUEST TO THE API  --------------------------------------------- //

//------------- Import -------------- // 
//import { searchValue as idProduct } from '@/components/Headers.vue'

const getAllProducts = async function (){
    let data;
    const response = await fetch("https://world.openfoodfacts.org?json=true") 
    if (response.status == 200) {
        data = response.json()
        console.log("Request success of all !")
        //console.log(data)
    } else {
    new Error(response.statusText)
    console.log("failure")
    }

    return data;
    
}

const getProductById = async function(idProduct) {

    let data;
    const response = await fetch("https://world.openfoodfacts.org/api/v2/product/" + idProduct) 
    if (response.status == 200) {
        data = response.json()
        console.log("Request success!")
        //console.log(data)
    } else {
    new Error(response.statusText)
    console.log("failure")
    }

    return data;
}
export {getProductById}
export {getAllProducts}



