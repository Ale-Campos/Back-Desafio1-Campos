import { Router } from "express";
import CartManager from "../services/CartManager.js";

const cartRouter = Router()

cartRouter.get('/', (req, res)=>{

    let carts = CartManager.getCartManager().getCarts()

    return res.status(200).json(carts)

})

cartRouter.post('/', (req, res) => {
    const cart = CartManager.getCartManager().addCart()

    return res.status(200).json(cart)

})

cartRouter.get('/:cid', (req, res) => {
    const {cid} = req.params
    if(!cid) {
        return res.status(400).json({error: "Id inválido"})
    }
    const {result, error, cart} = CartManager.getCartManager().getCartById(cid)
    if(!result)
    {
        return res.status(400).json(error)
    } else if(!cart) {
        return res.status(400).json({error: "No se encontró un cart con ese id"})
    }
    return res.status(200).json(cart.products)
})

cartRouter.post("/:cid/product/:pid", (req, res) => {
    const {cid, pid} = req.params
    const {quantity} = req.body
    if(!cid || !pid) {
        return res.status(400).json({error: "Id inválido"})
    }
    if(!quantity) {
        return res.status(400).json({error: "Quantity inválido"})
    }

    const { result, error, product } = CartManager.getCartManager().addToCart(cid, pid, quantity)

    if(!result) {
        return res.status(400).json(error)
    }

    return res.status(200).json(product)

})



export default cartRouter