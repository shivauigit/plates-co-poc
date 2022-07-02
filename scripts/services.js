const Services = (function(){
    function Services() {
        const GET_PRODUCTS_URL = '../assets/mock-data/products.json';
        const GET_INCENTIVES_URL = './assets/mock-data/incentives.json';
        const servicesObj = {
            getProducts: new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', GET_PRODUCTS_URL, true);
                xhr.onload = (response) => resolve(JSON.parse(response.currentTarget.response));
                xhr.onerror = () => reject(xhr.statusText);
                xhr.send();
            }),
            getProductById: (productId) => {
                return new Promise((resolve, reject) => {
                    const xhr = new XMLHttpRequest();
                    xhr.open('GET', GET_PRODUCTS_URL, true);
                    xhr.onload = (response) => {
                        const data = JSON.parse(response.currentTarget.response);
                        const selectedProduct = data.products.filter((prod) => prod.id === productId)[0];
                        resolve(selectedProduct);
                    }
                    xhr.onerror = () => reject(xhr.statusText);
                    xhr.send();
                });
            },
            getIncentives: new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', GET_INCENTIVES_URL, true);
                xhr.onload = (response) => {
                    const data = JSON.parse(response.currentTarget.response);
                    resolve(data.incentives);
                }
                xhr.onerror = () => reject(xhr.statusText);
                xhr.send();
            })
        };
        return servicesObj;
    }
    var servicesInstance;
    return {
        getInstance: () => {
            if (null == servicesInstance) {
                servicesInstance = new Services();               
                servicesInstance.constructor = null; // Note how the constructor is hidden to prevent instantiation
            }
            return servicesInstance;
        },
        
   };
})();
