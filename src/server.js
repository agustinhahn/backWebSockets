import express from "express";
import handlebars from "express-handlebars"
import { __dirname } from "./utils.js"
import { Server } from "socket.io"
import ProductManager from "./manager/products.manager.js";
import realTimeProducts from "./routers/realTimeProducts.router.js"

//instancia de la clase
const productManager = new ProductManager(__dirname+'/db/products.json')

//ejecutar servidor de express
const app = express()
const httpServer = app.listen(8080, () => {
    console.log("Escuchando al puerto 8080");
});

//ejecuto server IO
const socketServer = new Server(httpServer);

//statics
app.use(express.static(__dirname + "/public"));

//handlebars
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

//para realizar consultas en la URL (req.query)
app.use(express.urlencoded({ extended:true}));

//para manejar archivos json
app.use(express.json());

//rutas
app.use('/', realTimeProducts)

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

    socket.on('deleteProduct', async(id)=>{
        await productManager.deleteProduct(id)
    })
})