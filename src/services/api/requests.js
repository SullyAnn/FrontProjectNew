// ----------------------------------------- REQUEST TO THE API  --------------------------------------------- //

//------------- Import -------------- // 

const getProductById = async function(idProduct) {

    let data;
    const response = await fetch("https://world.openfoodfacts.org/api/v2/product/" + idProduct) 
    if (response.status == 200) {
        data = response.json()
    } else {
    new Error(response.statusText)
    console.log("getProductById request failed")
    }

    return data;
}

const getProductByNutriscore = async function(scoreGrade, Page) {

    let data;
    const response = await fetch("https://fr.openfoodfacts.org/cgi/search.pl?action=process&tagtype_0=nutrition_grades&tag_contains_0=contains&tag_0="+ scoreGrade +  "&page="+ Page + "&json=true") 
    if (response.status == 200) {
        data = response.json()
    } else {
    new Error(response.statusText)
    console.log("getProductByNutriscore request failed!")
    }

    return data;
}



export {getProductById}
export {getProductByNutriscore}



