import { Router } from "express";
import ProductManager from '../services/ProductManager.js'
import Product from "../models/Product.js";

const productRouter = Router();

productRouter.get("/", (req,res) => {
    let { limit } = req.query
    let productos = ProductManager.getProductManager().getProducts()

    if(limit === undefined) {
        return res.status(200).json(productos)
    } else if (isNaN(parseInt(limit))) {
        return res.status(400).json({error: 'Invalid limit'})
    } else {
        return res.status(200).json(productos.slice(0, parseInt(limit)))
    }
})

productRouter.post("/", (req,res) => {

    let {status} = req.body
    status === undefined && (req.body.status = true)

    let {result, error} = Product.isValid(req.body)
    if(!result) {
        return res.status(400).json({result, error})
    }

    let addResult = ProductManager.getProductManager().addProduct(req.body)
    if(!addResult.result) {
        return res.status(400).json(addResult)
    }
    return res.status(200).json(addResult)
})


productRouter.get("/:pid", (req,res) => {
    let {pid} = req.params

    if(pid === undefined || isNaN(parseInt(pid))) {
        return res.status(400).json({error: 'Invalid ID'})
    }
    let producto = ProductManager.getProductManager().getProductByID(pid)

    if(producto === undefined) {
        return res.status(404).json({error: 'Product not found'})
    }

    return res.status(200).json(producto)
})

productRouter.put("/:pid", (req,res) => {
    const {pid} = req.params


    if(pid === undefined || isNaN(parseInt(pid))) {
        return res.status(400).json({error: 'Invalid ID'})
    }

    let {result, error} = Product.hasEmptyProps(req.body)
    if(!result) {
        return res.status(400).json({result, error})
    }

    let updateResult = ProductManager.getProductManager().updateProduct(pid, req.body)

    if(!updateResult.result) {
        return res.status(400).json(updateResult)
    }
    return res.status(200).json(updateResult)
})

export default productRouter