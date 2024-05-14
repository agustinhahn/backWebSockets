const socketClient = io();

socketClient.on('saludoDesdeBack', (message)=>{
    console.log(message);
    socketClient.emit('getProducts', 'traeme los productos')
})

socketClient.on('allProducts', (data)=>{
    let infoProducts = '';
    data.map((prod)=>{
        infoProducts += `${prod.title} - $${prod.price} </br>`
    })
    products.innerHTML = infoProducts
})

const form = document.getElementById('form')
const inputName = document.getElementById('name')
const inputPrice = document.getElementById('price')
const products = document.getElementById('products')

form.onsubmit = (e) => {
    e.preventDefault();
    const title = inputName.value;
    const price = inputPrice.value;
    const product = {
        title,
        price
    };
    inputName.value = "";
    inputPrice.value = "";
    socketClient.emit('newProduct', product);
}

socketClient.on('products', (data)=>{
    let infoProducts = '';
    data.map((prod)=>{
        infoProducts += `${prod.title} - $${prod.price} </br>`
    })
    products.innerHTML = infoProducts
})

socketClient.on('message', (message)=>{
    console.log(message);
})