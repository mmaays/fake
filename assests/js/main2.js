const getAllProducts = async (page) => {
    try {
        const { data } = await axios.get(`https://fakestoreapi.com/products`);
        return data;
    }
     catch (error) {
        return [];
    }
}

const displayAllProducts = async (page=1) => {

    try {
        const products = await getAllProducts(page);
        const numOfPages= Math.ceil(products.length/6); //4
        let start= (page-1)*5;
        let end = start+5;
        const remain= products.slice(start,end);

console.log(remain);

        const result = remain.map((prod) => {

            return `
           <div class="prod">
           <img src="${prod.image}" alt="" class="imgsss">
           <p class="price d-none">${prod.price}</p>
           </div>
               `
        }).join('');

        document.querySelector(".allproducts .row").innerHTML = result; 
      
        let paginationLink= ``;

        if(page > 1){
            paginationLink += `<li><button onclick=displayAllProducts(${page-1})> &lt; </button></li>`;
        }
        else{
            paginationLink += `<li><button class="d-none" > &lt; </button></li>`;
        }

        for(let i = 1 ; i<= numOfPages ; i++){
            if(i==page){
                paginationLink+=`<li><button class="active" onclick=displayAllProducts(${i}) > ${i} </button></li>`;
            }
            else{
                paginationLink+=`<li><button onclick=displayAllProducts(${i}) > ${i} </button></li>`;

            }
        }

        if(page < numOfPages){
            paginationLink += `<li><button onclick=displayAllProducts(${page+1})> &gt; </button></li>`;
        }
        else{
            paginationLink += `<li><button class="d-none" > &gt; </button></li>`;
        }

        customModal();

        document.querySelector(".pagination-sec .pagination").innerHTML=paginationLink;

    }

    catch (error) {
        document.querySelector(".allproducts .row").innerHTML = "<p>please try again later .. </p>";
    }

    finally {
        document.querySelector(".loading").classList.add("d-none");
    }
}

displayAllProducts();


function customModal() {


    const modal = document.querySelector(".my-modal");
    const xbtn = document.querySelector(".x-btn");
    const Rbtn = document.querySelector(".right-btn");
    const Lbtn = document.querySelector(".left-btn");
    const imgs = Array.from(document.querySelectorAll(".imgsss"));
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


