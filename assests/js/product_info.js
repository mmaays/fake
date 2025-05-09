const getProductID = async () => {
try{
    const urlParams = new URLSearchParams(window.location.search);
    const categoryID = urlParams.get('id');
    const { data } = await axios.get(`https://fakestoreapi.com/products/${categoryID}`);

    return data;}

    catch(error){
        return null ;
    }

}



const displayProductsInfo = async () => {

try{

    const product = await getProductID();
console.log(product);

const result = `
        <div calss="product">
         <img src="${product.image}" alt="img">
                <h3>${product.description}</h3>
                <p>price : ${product.price} $ </p>
                <p>rating : ${product.rating.rate} <i class="fa-solid fa-star fa-sm"></i> </p>
                <p>count : ${product.rating.count} </p>
        </div>
`
document.querySelector(".information .container").innerHTML = result;

}

catch (error) {
    const result = `
        <div calss="product">
                <p>product info is not available now
                </b> please try again later ... 
                </p>
        </div>
`
document.querySelector(".information .container").innerHTML = result;
}


finally{
    document.querySelector(".loading").classList.add("d-none");  
}
   
}

displayProductsInfo();

window.onscroll = function () {
    const header = document.querySelector("header");
    const info = document.querySelector(".information");
    const x = info.offsetTop - 104;



if(window.scrollY > x )
{
    header.classList.add("header-scrolled");
}

else{
    header.classList.remove("header-scrolled");
}

}