import { Router } from "express";
const router = Router()
import ProductManager from "../manager/products.manager.js"
import { bodyProductsValidator } from "../middlewares/body.products.validator.js";
import { __dirname } from "../utils.js"

const productManager = new ProductManager(__dirname+'/db/products.json')


//traera todos los objetos
router.get("/", async(req,res)=>{
    try {
        let limit = req.query.limit ? parseInt(req.query.limit): 0
        const products = await productManager.getProducts(limit)
        res.status(200).json(products)
        res.render('home')
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
})

//traera objetos por id
router.get("/:id", async(req,res)=>{
    try {
        const {id} = req.params
        const productById= await productManager.getProductsById(id)
        if(!productById) res.status(404).json({msg:"product not found"})
        else res.status(200).json(productById)
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
})

//cargara un objeto nuevo
router.post("/", bodyProductsValidator ,async(req,res)=>{
    try {
        const product = await productManager.addProduct(req.body)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
})

//eliminara un objeto elegido por id
router.delete("/:id", async(req,res)=>{
    try {
        const {id} = req.params
        const productDelete = await productManager.deleteProduct(id)
        if(!productDelete) res.status(404).json( { msg : "error deleting product"} )
        else res.status(200).json({ msg : "product deleted successfully!" })
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
})

//modificara un objeto
router.put("/:id", bodyProductsValidator, async(req,res)=>{
    try {
        const {id} = req.params;
        const productUpdate = await productManager.updateProduct(req.body, id)
        if(!productUpdate) res.status(404).json({msg:"the product not found"})
        else res.status(200).json({msg:"product update successfully"})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
})

export default router