import __dirname from '../utils/dirname.js'
import fs from 'fs'

export default class ProductManager {

    static totalProductCounter = 0
    static productManager;

    constructor(){
        this.path = __dirname + '/../database/products.json'
    }

    static getProductManager() {
        if(ProductManager.productManager == undefined) {
            ProductManager.productManager = new ProductManager(__dirname + '/../database/products.json')
        }
        return ProductManager.productManager
    }

    isProductValid(product) {
        if(product.title != undefined &&
            product.description != undefined &&
            product.price != undefined &&
            product.thumbnail != undefined &&
            product.code != undefined &&
            product.stock != undefined) {
                return true
            } else {
                return false
            }
    }

    getProducts() {

        let products = JSON.parse(fs.readFileSync(this.path, 'utf-8', (err, data) => data))
        return products
    }

    getProductByID(id) {
        if(id) {
            let products = this.getProducts()
           return products.find(prod => prod.id == id)
        } else {
            console.log("El id introducido es inválido")
            return undefined
        }
    }

    addProduct(product){
        
        if(this.isProductValid(product)) {

            let products = this.getProducts()
            let existingPorduct = products.find(prod => prod.code == product.code)
            
            if(existingPorduct) {
                console.log("El producto ya existe")
            } else {
                product.id = products.length + 1
                products.push(product)
                ProductManager.totalProductCounter++
                fs.writeFileSync(this.path, JSON.stringify(products, null, 2))
                console.log("Producto agregado correctamente");
            }
        } else {
            console.log("El producto tiene campos incompletos")
        }
        

        return this.products
    }
    
    updateProduct(id, product) {
        if(id && product && this.isProductValid(product)) {
            let products = this.getProducts()
            let productIndex = products.findIndex(prod => prod.id == id)

            if(productIndex != -1) {
                product.id = products[productIndex].id
                products[productIndex] = product
                fs.writeFileSync(this.path, JSON.stringify(products, null, 2))
                console.log("Producto actualizado correctamente");
            } else {
                console.log("No se encontró el producto a actualizar");
            }
            return products
        } else {
            console.log("No se pudo actualizar el producto, verifique los datos ingresados")
            return null
        }
    }

    removeProduct(id) {

        if(id) {
            let products = this.getProducts()
            let product = products.find(prod => prod.id == id)
    
            if(product){
                fs.writeFileSync(this.path, JSON.stringify(products.filter(prod => prod.id != id), null, 2))
                console.log("Producto eliminado correctamente");
            } else {
                console.log("No se encontró el producto a eliminar");
            }
        } else {
            console.log("El id introducido es inválido")
        }
    }
}
