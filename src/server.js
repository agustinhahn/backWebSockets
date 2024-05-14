import express from "express";
import handlebars from "express-handlebars"
import { __dirname } from "./utils.js"
import { Server } from "socket.io"
import ProductManager from "./manager/products.manager.js";
import realTimeProducts from "./routers/realTimeProducts.router.js"
import products from "./routers/products.router.js"

const productManager = new ProductManager(__dirname+'/db/products.json')
const app = express()

app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

// app.use('/realtimeproducts', realTimeProducts)
app.use('/home', products)

const httpServer = app.listen(8080, () => {
    console.log("Escuchando al puerto 8080");
});

const socketServer = new Server(httpServer);


socketServer.on('connection', (socket) => {
    console.log(`Usuario conectado: ${socket.id}`);

    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    })

    socket.emit('saludoDesdeBack', 'Bienvenido a websockets')

    socket.on('getProducts', async (message) => {
        console.log(message);
        socket.emit('allProducts', await productManager.getProducts())
    })

    socket.on('newProduct', async (prod) => {
        await productManager.addProduct(prod)
        socketServer.emit('products', await productManager.getProducts());
    })
})