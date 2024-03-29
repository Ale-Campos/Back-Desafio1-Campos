import { Router } from "express";
import CartManager from "../services/CartManager.js";

const cartRouter = Router()

cartRouter.get('/', async (req, res)=>{

    let carts = await CartManager.getCarts()
    return res.status(200).json(carts)

})

cartRouter.post('/', async (req, res) => {

    try { 
        const cart = await CartManager.addCart()
        return res.status(201).json(cart)
    } catch(error) {
        return res.status(500).json({error: error.message})
    }
})

cartRouter.get('/:cid', async (req, res) => {
    const {cid} = req.params
    try {

        if(!cid || cid.length !== 24) {
            return res.status(400).json({error: "Id inválido"})
        }

        let cart = await CartManager.getCartById(cid)
        
        return res.status(200).json(cart)
    } catch(error) {
        return res.status(500).json({error: error.message})
    }
})

cartRouter.post("/:cid/product/:pid", async (req, res) => {
    const {cid, pid} = req.params
    const {quantity} = req.body
    if(!cid || cid.length !== 24 || !pid || pid.length !== 24) {
        return res.status(400).json({error: "Id inválido"})
    }
    if(!quantity) {
        return res.status(400).json({error: "Quantity inválido"})
    }

    try {
        let updatedCart = await CartManager.addToCart(cid, pid, quantity)
    
        return res.status(201).json({message: "Producto agregado al carrito", updatedCart})
    } catch(error) {
        return res.status(500).json({error: error.message})
    }
})

cartRouter.delete("/:cid/product/:pid", async (req, res) => {
    const {cid, pid} = req.params
    if(!cid || cid.length !== 24 || !pid || pid.length !== 24) {
        return res.status(400).json({error: "Id inválido"})
    }

    try {

        if(!await CartManager.getProductFromCart(cid, pid)) {
            return res.status(404).json({error: "Producto no encontrado en el carrito"})
        }

        let updatedCart = await CartManager.removeFromCart(cid, pid)
        return res.status(200).json({message: "Producto eliminado del carrito", updatedCart})
    } catch(error) {
        return res.status(500).json({error: error.message})
    }
})

cartRouter.put("/:cid", async (req, res) => {
    const {cid} = req.params
    const { products } = req.body

    if(!cid || cid.length !== 24) {
        return res.status(400).json({error: "Id inválido"})
    }

    if(!products || !Array.isArray(products)) {
        return res.status(400).json({error: "Se debe pasar una lista de productos valida"})
    }

    let invalidProduct = products.find(product => product.quantity === undefined || product.product === undefined)
    
    if(invalidProduct) {
        return res.status(400).json({error: "Hay un producto sin cantidad o id"})
    }
    try {
        let cart = await CartManager.getCartById(cid)
        if(!cart) {
            return res.status(404).json({error: "Carrito no encontrado"})
        }

        let updatedCart = await CartManager.updateCart(cid, products)

        return res.status(200).json({message: "Se actualizco la lista del carrito", updatedCart})
    } catch(error) {
        console.log(error)
        return res.status(500).json({error: error.message})
    }
})

cartRouter.put("/:cid/product/:pid", async (req,res) => {
    const {cid, pid} = req.params
    const {quantity} = req.body

    if(!cid || cid.length !== 24 || !pid || pid.length !== 24) {
        return res.status(400).json({error: "Id inválido"})
    }
    if(!quantity || isNaN(parseInt(quantity))) {
        return res.status(400).json({error: "Quantity inválido"})
    }

    try {

        if(!await CartManager.getCartById(cid)) {
            return res.status(404).json({error: "Carrito no encontrado"})
        }
    
        if(!await CartManager.getProductFromCart(cid, pid)) {
            return res.status(404).json({error: "Producto no encontrado en el carrito"})
        }

        let updatedCart = await CartManager.unpdateProductQuantity(cid, pid, quantity)

        return res.status(200).json({message: "Se actualizó la cantidad del producto", updatedCart})
    } catch(error) {
        return res.status(500).json({error: error.message})
    }

})

cartRouter.delete("/:cid", async(req,res) => {
    const {cid} = req.params
    if(!cid || cid.length !== 24) {
        return res.status(400).json({error: "Id inválido"})
    }

    try {
        let cart = await CartManager.getCartById(cid)
        if(!cart) {
            return res.status(404).json({error: "Carrito no encontrado"})
        }

        let updatedCart = await CartManager.clearCart(cid)
        return res.status(200).json({message: "Carrito vaciado", updatedCart})
    } catch(error) {
        return res.status(500).json({error: error.message})
    }

})

export default cartRouter