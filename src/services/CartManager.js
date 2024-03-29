import { cartsModel } from "../dao/models/carts.js"
import __dirname from "../utils/dirname.js"

export default class CartManager {
    static cartManager

    constructor(){
        this.path = __dirname + '/../database/carts.json'
    }

    static getCartManager() {
        if(CartManager.cartManager === undefined) {
            CartManager.cartManager = new CartManager()
        }
        return CartManager.cartManager
    }

    static async addCart() {
        try {
            let newCart = await new cartsModel().save()
            console.log(newCart)
            return newCart
        } catch(error) {
            throw new Error(error)
        }
    }

    static async getCarts() {
        let carts = await cartsModel.find()
        return carts
    }

    static async getCartById(id) {
        try {
            let cart = await cartsModel.findById(id)
            return cart
        } catch(error) {
            console.log(error)
            throw new Error("Error al buscar el carrito")
        }
    }

   static async addToCart(id, productId, quantity) {
        console.log(id)
        let cart = await cartsModel.findById(id)
        cart.products.push({product: productId, quantity})
        await cartsModel.updateOne({_id: id}, cart)
    }
}