const fs = require('fs')

class Product {
    constructor(title, description, price, thumbnail, code, stock){
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code //Identificador
        this.stock = stock
    }
}

class ProductManager {

    static totalProductCounter = 0

    constructor(path){
        this.path = path
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

    getProductByID(code) {
        if(code) {
            let products = this.getProducts()
           return products.find(prod => prod.code == code)
        } else {
            console.log("El id introducido es inválido")
            return null
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
    
    updateProduct(code, product) {
        if(code && product && this.isProductValid(product)) {
            let products = this.getProducts()
            let productIndex = products.findIndex(prod => prod.code == code)

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

    removeProduct(code) {

        if(code) {
            let products = this.getProducts()
            let product = products.find(prod => prod.code == code)
    
            if(product){
                fs.writeFileSync(this.path, JSON.stringify(products.filter(prod => prod.code != code), null, 2))
                console.log("Producto eliminado correctamente");
            } else {
                console.log("No se encontró el producto a eliminar");
            }
        } else {
            console.log("El id introducido es inválido")
        }
    }
}

let pm = new ProductManager('./products/products.json')




let product1 = new Product('Producto1', 'Descripcion 1', 100, 'url', '122333', 100)
let product2 = new Product('Producto2', 'Descripcion 1', 100, 'url', '455678', 100)
let product3 = new Product('Producto3', 'Descripcion 1', 100, 'url', '787844', 100)
let product4 = new Product('Producto4', 'Descripcion 1', 100, 'url', '993664')
let product1Updated = new Product('ProductoActualizado2', 'Descripcion Actualizada', 100, 'url', '122333', 100)

pm.addProduct(product1)
pm.addProduct(product1) // Duplicado
pm.addProduct(product2)
pm.addProduct(product3)
pm.addProduct(product4) // Invalido

pm.updateProduct('122333', product1Updated)
pm.updateProduct('------', product1Updated) // Actualizar un producto que no existe

pm.removeProduct('455678') // Eliminar producto 2
pm.removeProduct('------') // Eliminar un producto que no existe

console.log(pm.getProducts())
console.log(pm.getProductByID('122333'))

