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
        await CartManager.addToCart(cid, pid, quantity)
    
        return res.sendStatus(201)
    } catch(error) {
        return res.status(500).json({error: error.message})
    }
})

export default cartRouter