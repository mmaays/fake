const getCategoryProduct = async () => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const categoryNamme = urlParams.get('category');
        const { data } = await axios.get(`https://fakestoreapi.com/products/category/${categoryNamme}`);

        return data;
    }


    catch (error) {
        return [];
    }

}


const displayProducts = async () => {

    try {
        const products = await getCategoryProduct();

        const result = products.map((product) => {
            return `
        <div calss="product">
         <img src="${product.image}" alt="img" class="product-imgs">
                <h3>${product.title}</h3>
                <p>price : ${product.price} $ </p>
                <a href="./info.html?id=${product.id}"> More Information ... </a>
        </div>
        `
        }).join('');

        document.querySelector(".products .row").innerHTML = result;


        customModal();

    }


    catch (error) {
        document.querySelector(".categories .row").innerHTML = "<p>please try again later .. </p>";
    }

    finally {
        document.querySelector(".loading").classList.add("d-none");
    }
}

displayProducts();


function customModal() {


    const modal = document.querySelector(".my-modal");
    const xbtn = document.querySelector(".x-btn");
    const Rbtn = document.querySelector(".right-btn");
    const Lbtn = document.querySelector(".left-btn");
    const imgs = Array.from(document.querySelectorAll(".product-imgs"));
    let current = 0;

    imgs.forEach(function (img) {

        img.addEventListener('click', (e) => {

            modal.classList.remove("d-none");
            modal.querySelector("img").setAttribute("src", e.target.src);
            const currentImg = e.target;
            current = imgs.indexOf(currentImg);


        });
    });

    xbtn.addEventListener('click', (e) => {
        modal.classList.add("d-none");
    });


    Rbtn.addEventListener('click', (e) => {
        current++;
        if (current >= imgs.length) {
            current = 0;
        }

        const src = imgs[current].getAttribute("src");
        modal.querySelector("img").setAttribute("src", src);
    });


    Lbtn.addEventListener('click', (e) => {
        current--;
        if (current < 0) {
            current = imgs.length - 1;
        }

        const src = imgs[current].getAttribute("src");
        modal.querySelector("img").setAttribute("src", src);
    });


document.addEventListener("keydown", (e)=>{
if(e.code=="ArrowRight"){

    current++;
    if (current >= imgs.length) {
        current = 0;
    }

    const src = imgs[current].getAttribute("src");
    modal.querySelector("img").setAttribute("src", src);
}

else if (e.code=="ArrowLeft"){
    current--;
    if (current < 0) {
        current = imgs.length - 1;
    }

    const src = imgs[current].getAttribute("src");
    modal.querySelector("img").setAttribute("src", src);

}
else  if (e.code=="Escape") {
    modal.classList.add("d-none");
}

});



}




window.onscroll = function () {
    const header = document.querySelector("header");
    const prod = document.querySelector(".products");
    const x = prod.offsetTop - 104;



    if (window.scrollY > x) {
        header.classList.add("header-scrolled");
    }

    else {
        header.classList.remove("header-scrolled");
    }

}

