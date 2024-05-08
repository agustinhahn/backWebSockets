import express from "express";
import handlebars from "express-handlebars"
import { __dirname } from "./utils.js"
import { Server } from "socket.io"
import realTimeProducts from "./views/routers/realTimeProducts.router.js"

const app = express()

app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use('/realtimeproducts', realTimeProducts)

const httpServer = app.listen(8080, () => {
    console.log("Escuchando al puerto 8080");
});

