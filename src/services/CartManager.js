import { cartsModel } from "../dao/models/carts.js"
import __dirname from "../utils/dirname.js"

export default class CartManager {
    static cartManager

    constructor(){
        this.path = __dirname + '/../database/carts.json'
    }

    static async addCart() {
        try {
            let newCart = await new cartsModel().save()
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
    try {
        let cart = await cartsModel.findById(id)
        cart.products.push({product: productId, quantity})
        await cartsModel.updateOne({_id: id}, cart)
        return cart
    } catch(error) {
        throw new Error(error)
    }
        
    }

    static async getProductFromCart(id, productId) {
        try {
            let cart = await cartsModel.findById(id)
            let product = cart.products.find(product => product.product._id == productId)
            return product
        } catch (error) {
            throw new Error(error)
        }
    }

    static async removeFromCart(id, productId) {
        try {
            //* Forma 1 utilizando Aggregations
            // let cart = await cartsModel.findByIdAndUpdate(id, {
            //     $pull: {products: {product: productId}}
            // }, {new: true})

            //* Forma 2 utilizando filter
            let cart = await cartsModel.findById(id)
            cart.products = cart.products.filter(order => order.product._id != productId)

            await cartsModel.updateOne({_id: id}, cart)
            return cart
        } catch (error) {
            throw new Error(error)
        }
    }

    static async updateCart(id, products) {
        let cart = await cartsModel.findById(id)
        cart.products = products
        await cartsModel.updateOne({_id: id}, cart)
        return cart
    }

    static async unpdateProductQuantity(id, productId, quantity) {
        let cart = await cartsModel.findById(id)
        let product = cart.products.find(product => product.product._id == productId)
        product.quantity = quantity
        
        await cartsModel.updateOne({_id: id}, cart)

        return cart
    }

    static async clearCart(id) {
        try {
            let cart = await cartsModel.updateOne({_id: id}, {products: []})

            cart = await cartsModel.findById(id)

            return cart
        } catch(error) {
            throw new Error(error)
        }
    }
}