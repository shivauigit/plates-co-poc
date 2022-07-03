# plates-co-poc

Products are fetched through mock data of json format.
<pre>
{
    "products": [
        {
            "id": "R01",
            "name": "Red Plate",
            "price": 32.95,
            "imgPath": "./assets/images/red-plate.jpg"
        },
        {
            "id": "G01",
            "name": "Green Plate",
            "price": 24.95,
            "imgPath": "./assets/images/green-plate.jpg"
        },
        {
            "id": "B01",
            "name": "Blue Plate",
            "price": 7.95,
            "imgPath": "./assets/images/blue-plate.jpg"
        }
    ] 
}
</pre>

# Incentives
Incentives are fetched from mock data of incentives.json. Note: Incentives must start from lower to higher combinations.
<pre>
{
    "incentives": [
        {
            "minValue": 1,
            "maxValue": 49.99,
            "deliveryCost": 4.95
        },
        {
            "minValue": 50.00,
            "maxValue": 89.99,
            "deliveryCost": 2.95
        }
        ,
        {
            "minValue": 90.00,
            "maxValue": 0,
            "deliveryCost": 0
        }
    ]
}
</pre>
# Initiation with populating Products
Application invokes loadProducts method on window load.
<pre>
window.onload = () => {
    loadProducts();
};
</pre>

Products and Cart have their own JS files separately.

# Assets
All three types of plates are using sample images from assets folder.
