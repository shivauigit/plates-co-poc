const Products = (function(){
    function Products() {
        const productsListElement = document.getElementById('products-list');
        const services = Services.getInstance();
        const ProductsObj = {
            loadProducts: () => {
                services.getProducts
                    .then(data =>{
                        let productsMarkup = '';
                        for (let index = 0; index < data.products.length; index++) {
                            const product = data.products[index];
                            productsMarkup += `<li class="list-item">
                                <div class="product-title">${product.name}</div>
                                <img src="${product.imgPath}" />
                                <div class="controls">
                                    <div class="price">$${product.price}</div>
                                    <button onClick="cart.addToCart('${product.id}')">Add To Cart</button>
                                </div>
                            </li>`;
                        }
                        productsListElement.innerHTML = productsMarkup;
                    })
                    .catch(error =>{
                        console.log(error.toString());
                    });
            }
        };
        return ProductsObj;
    }
    var productsInstance;
    return {
        getInstance: () => {
            if (null == productsInstance) {
                productsInstance = new Products();               
                productsInstance.constructor = null;
            }
            return productsInstance;
        },
        
   };
})();

const products = Products.getInstance();

const cart = Cart.getInstance();

// Initiating by loading products
window.onload = () => {
    products.loadProducts();
};