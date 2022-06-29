const cartItems = [];
const cartTotalData = {
    deliveryCost: 0,
    orderValue: 0,
    total: 0,
    incentiveApplied: false
};

/**
 * 
 * @param {fetching product by productId }  
 * @returns 
 */
const getProductById = (productId) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', './assets/mock-data/products.json', true);
        xhr.onload = (response) => {
            const data = JSON.parse(response.currentTarget.response);
            const selectedProduct = data.products.filter((prod) => prod.id === productId)[0];
            resolve(selectedProduct);
        }
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send();
    });
};

/**
 * 
 * @param {Adding Product to Cart by } proudctId 
 */
const addToCart = (proudctId) => {
    getProductById(proudctId)
        .then(selectedProduct =>{
            if (selectedProduct) {
                const productExistIndex = cartItems.findIndex(prod => prod.id === selectedProduct.id);
                if (productExistIndex !== -1) {
                    const existingProduct = cartItems[productExistIndex];
                    existingProduct.quantity++;
                    existingProduct.price = (existingProduct.price * existingProduct.quantity).toFixed(2);
                } else {
                    selectedProduct.quantity = 1;
                    selectedProduct.price = (selectedProduct.price * selectedProduct.quantity).toFixed(2);
                    cartItems.push(selectedProduct);
                }
                updateCartItems();
                updateToltal();
            }

        })
        .catch(error =>{
            console.log(error.toString());
        });
};

/**
 * Updating Cart Items by iterating cartItems arrayCollection
 */
const updateCartItems = () => {
    const cartItemsListElement = document.getElementById('cart-list');
    let cartItemMarkup = '';
    for (let index = 0; index < cartItems.length; index++) {
        const cartItem = cartItems[index];
        cartItemMarkup += `<li class="cart-list-item">
            <img class="thumb" src="${cartItem.imgPath}" />
            <div class="item-detail">
                <div class="item-title">${cartItem.name}</div>
                <div class="items">
                    <button onClick="removeItem('${cartItem.id}')">Remove</button>
                    <div class="qty">Quantity: ${cartItem.quantity}</div>
                    <div class="price">$${cartItem.price}</div>
                </div>
            </div>
        </li>`;
    }
    cartItemsListElement.innerHTML = cartItemMarkup;
}

/**
 * Updating Total value based on incentives and derived delivery cost
 */
const updateToltal = () => {
    cartTotalData.orderValue = 0;
    for (let index = 0; index < cartItems.length; index++) {
        const item = cartItems[index];
        cartTotalData.orderValue = (parseFloat(cartTotalData.orderValue) + parseFloat(item.price)).toFixed(2);
    }
    getIncentives.then(incentives => {
        cartTotalData.incentiveApplied = false;
        for (let index = 0; index < incentives.length; index++) {
            const incentive = incentives[index];
            const orderValue = parseFloat(cartTotalData.orderValue);
            if (cartTotalData.orderValue > 0 && !cartTotalData.incentiveApplied && orderValue >= incentive.minValue && (incentive.maxValue === 0 || orderValue <= incentive.maxValue )) {
                cartTotalData.deliveryCost = incentive.deliveryCost;
                cartTotalData.incentiveApplied = true;
            }
        }
        cartTotalData.total = (parseFloat(cartTotalData.orderValue) + parseFloat(cartTotalData.deliveryCost)).toFixed(2);
        const orderDetailElement = document.getElementById('order-detail');
        orderDetailElement.innerHTML = `<div class="deliver-cost">Delivery Cost: $${cartTotalData.deliveryCost}</div>
        <div class="order-value">Total: $${cartTotalData.total}</div>`;
    }).catch(error =>{
        console.log(error.toString());
    });
};

/**
 * fetching current incentives through json
 */
const getIncentives = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', './assets/mock-data/incentives.json', true);
    xhr.onload = (response) => {
        const data = JSON.parse(response.currentTarget.response);
        resolve(data.incentives);
    }
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
});

/**
 * 
 * @param {removing item by} itemId 
 */
const removeItem = (itemId) => {
    const itemIndex = cartItems.findIndex(prod => prod.id === itemId);
    if (itemIndex !== -1) {
        cartItems.splice(itemIndex, 1);
        if (cartItems.length) {
            updateCartItems();
            updateToltal();
        } else {
            emptyCart();
        }
    }
};

/**
 * Emptying Cart when there are no items and updating total
 */
const emptyCart = () => {
    const cartItemsListElement = document.getElementById('cart-list');
    cartItemsListElement.innerHTML = '';
    cartTotalData.deliveryCost = 0;
    cartTotalData.orderValue = 0;
    cartTotalData.total = 0;
    cartTotalData.incentiveApplied = false;
    const orderDetailElement = document.getElementById('order-detail');
    orderDetailElement.innerHTML = `<div class="deliver-cost">Delivery Cost: $${cartTotalData.deliveryCost}</div>
    <div class="order-value">Total: $${cartTotalData.total}</div>`;
};
