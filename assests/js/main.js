const getCategories = async () => {
    try {
        const { data } = await axios.get(`https://fakestoreapi.com/products/categories`);
        return data;
    }
    catch (error) {
        return [];
    }
}


const displayCategories = async () => {

    try {
        const categories = await getCategories();

        const result = categories.map((category) => {

            return `
           <div class="category">
           <h2>${category}</h2>
           <a href="./details.html?category=${category}">details</a>
           </div>
               `
        }).join('');


        document.querySelector(".categories .row").innerHTML = result;

    }

    catch (error) {
        document.querySelector(".categories .row").innerHTML = "<p>please try again later .. </p>";
    }

    finally {
        document.querySelector(".loading").classList.add("d-none");
    }
}

displayCategories();


window.onscroll = function () {
    const header = document.querySelector("header");
    const cat = document.querySelector(".categories");
    const x = cat.offsetTop - 104;

if(window.scrollY > x )
{
    header.classList.add("header-scrolled");
}

else{
    header.classList.remove("header-scrolled");
}

}


