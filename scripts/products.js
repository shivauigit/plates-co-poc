/**
 * Fetching Products from JSON as mock data
 */
const getProducts = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '../assets/mock-data/products.json', true);
    xhr.onload = (response) => resolve(JSON.parse(response.currentTarget.response));
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
});

/**
 * Loading Products 
 */
const loadProducts = () => {
    getProducts
        .then(data =>{
            const productsListElement = document.getElementById('products-list');
            let productsMarkup = '';
            for (let index = 0; index < data.products.length; index++) {
                const product = data.products[index];
                productsMarkup += `<li class="list-item">
                    <div class="product-title">${product.name}</div>
                    <img src="${product.imgPath}" />
                    <div class="controls">
                        <div class="price">$${product.price}</div>
                        <button onClick="addToCart('${product.id}')">Add To Cart</button>
                    </div>
                </li>`;
            }
            productsListElement.innerHTML = productsMarkup;
        })
        .catch(error =>{
            console.log(error.toString());
        });
};


window.onload = () => {
    loadProducts();
};