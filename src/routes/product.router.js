import { Router } from "express";
import ProductManager from '../services/ProductManager.js'
import Product from "../models/Product.js";

const productRouter = Router();

productRouter.get("/", async (req,res) => {
    let { limit, page, query, sort } = req.query
    let products = await ProductManager.getProducts(limit || 10, page || 1, query || null, sort || 'desc')

    console.log(products)
    if(limit === undefined) {
        return res.status(200).json(products)
    } else if (isNaN(parseInt(limit))) {
        return res.status(400).json({error: 'Invalid limit'})
    } else {
        return res.status(200).json(products)
    }
})

productRouter.post("/", async (req,res) => {
    try {
        let {status} = req.body
        status === undefined && (req.body.status = true)

        let {result, error} = Product.isValid(req.body)
        if(!result) {
            return res.status(400).json({result, error})
        }

        let existingProduct = await ProductManager.getProductByCode(req.body.code)

        if(existingProduct.length !== 0) {
            return res.status(400).json({
                error: "There is already a product with that code",
                existingProduct
            })
        }
        let newProduct = await ProductManager.addProduct(req.body)
        return res.status(201).json(newProduct)
    }catch(error) {
        return res.status(500).json(error)
    }
    
})


productRouter.get("/:pid", async (req,res) => {
    try {
        let {pid} = req.params

        if(pid.length !== 24) {
            return res.status(400).json({error: 'Invalid ID'})
        }

        let product = await ProductManager.getProductById(pid)

        return res.status(200).json(product)

    } catch(error) {
        return res.status(500).json({error: error.message})
    }
})

productRouter.put("/:pid", async (req,res) => {
    const {pid} = req.params

    try {

        if(pid === undefined || isNaN(parseInt(pid))) {
            return res.status(400).json({error: 'Invalid ID'})
        }

        let productToUpdate = await ProductManager.getProductById(pid)
        if(productToUpdate === null) {
            return res.status(404).json({resutl: false, error: 'Product not found'})
        }
    
        let {result, error} = Product.hasEmptyProps(req.body)
        if(!result) {
            return res.status(400).json({result, error})
        }
    
        let updateResult = await ProductManager.updateProduct(pid, req.body)
        console.log(updateResult)
        if(!updateResult.result) {
            return res.status(400).json(updateResult)
        }
        return res.status(200).json(updateResult)

    } catch(error) {
        return res.status(500).json({error: error.message})
    }

})

productRouter.delete("/:pid", async (req,res) => {
    const {pid} = req.params

    try {

        if(pid === undefined || isNaN(parseInt(pid))) {
            return res.status(400).json({error: 'Invalid ID'})
        }

        let productToDelete = await ProductManager.getProductById(pid)
        if(productToDelete === null) {
            return res.status(404).json({result: false, error: 'Product not found'})
        }

        let result = await ProductManager.removeProduct(pid)
        if(result.result === false) {
            return res.status(400).json(result)
        }   
        return res.status(200).json(result)

    } catch(error) {
        return res.status(500).json({error: error.message})
    }

})

export default productRouter