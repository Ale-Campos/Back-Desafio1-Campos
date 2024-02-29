import Cart, { CartProduct } from "../models/Cart.js"
import __dirname from "../utils/dirname.js"
import fs from "fs"

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

    addCart() {
        let newCart = new Cart()
        let carts = this.getCarts()
        carts = [...carts, newCart]

        fs.writeFileSync(this.path, JSON.stringify(carts), null, 2)

        return newCart

    }

    getCarts() {
        let carts = JSON.parse(fs.readFileSync(this.path, 'utf-8', (err, data) => data))
        return carts
    }

    getCartById(id) {
        let result = {result: true, error: ''}

        if(id) {
            let cart = this.getCarts()
            result.cart = cart.find(prod => prod.id == id)

        } else {
            result.result= false
            result.error = "El id es invalid"
        }

        return result
    }

    addToCart(id, productId, quantity) {
        console.log(id)
        let result = {result: true, error: ''}
        let carts = this.getCarts()
        let cartIndex = carts.findIndex(cart => cart.id == id)
        if(cartIndex !== -1){

            let cart = carts[cartIndex]
            let cartProduct = new CartProduct(productId, quantity)
            let existigProductIndex = cart.products.findIndex((prod) => prod.product == productId)
            
            if(existigProductIndex === -1 ) {
                cart.products.push(cartProduct)
            } else {
                cart.products[existigProductIndex].quantity += quantity
            }

            fs.writeFileSync(this.path, JSON.stringify(carts, null, 2))
            result.product = cartProduct
        } else {
            result.result = false
            result.error= 'Cart not found'
        }
        return result
    }
}