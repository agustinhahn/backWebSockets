import { Router } from "express";
import ProductManager from "../manager/products.manager.js";
import { __dirname } from "../utils.js";

const productManager = new ProductManager(`${__dirname}/db/products.json`)
const router = Router()

router.get('/', async (req, res) => {
    let allProducts = await productManager.getProducts()
    res.render('home', {allProducts})
})

router.get('/realtimeproducts', async (req, res) => {
    let allProducts = await productManager.getProducts()
    res.render('realtimeproducts', {allProducts})
})

export default router