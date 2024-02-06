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

    constructor(){
        this.products = []
    }

    getProducts() {
        return this.products
    }

    addProduct(product){

        if(product.title != undefined &&
            product.description != undefined &&
            product.price != undefined &&
            product.thumbnail != undefined &&
            product.code != undefined &&
            product.stock != undefined) {

            let existingPorduct = this.products.find(prod => prod.code == product.code)
            
            if(existingPorduct) {
                console.log("El producto ya existe")
            } else {
                product.id = this.products.length + 1
                this.products.push(product)
                ProductManager.totalProductCounter++
            }
        } else {
            console.log("El producto tiene campos incompletos")
        }
        
        return this.products
    }

    getProductByID(id) {
        if(id) {
           return this.products.find(prod => prod.id == id)
        } else {
            console.log("El id introducido es inválido")
            return null
        }
    }

    removeProduct(code) {

        if(code) {

            let product = this.products.find(prod => prod.code == code)
    
            if(product){
                this.products = this.products.filter(prod => prod.code != code)
            }
        }
        
        return this.products
    }
}

let pm = new ProductManager

let product = new Product('Producto1', 'Descripcion 1', 100, 'url', '122333', 100)
let product2 = new Product('Producto1', 'Descripcion 1', 100, 'url', '455678', 100)
let product3 = new Product('Producto1', 'Descripcion 1', 100, 'url', '787844', 100)
let product4 = new Product('Producto1', 'Descripcion 1', 100, 'url', '993664', 100)
let duplicatedProduct = new Product('Producto1', 'Descripcion 1', 100, 'url', '122333', 100)
let invalidProduct = new Product('Producto1', 100, 'url', '122333', 100) // Sin decripcion

pm.addProduct(product)
pm.addProduct(product2)
pm.addProduct(product3)
pm.removeProduct(product3.code)
pm.addProduct(product4)
pm.addProduct(invalidProduct)
pm.addProduct(duplicatedProduct)
console.log('Muestro el producto con id 2');
console.log(pm.getProductByID(2))
console.log('Muestro los productos');
console.log(pm.getProducts())
console.log('Muestro el total de productos que se han ingresado historicamente');
console.log(ProductManager.totalProductCounter) // Marca 3 porque producto 3 fue agregado y luego eliminado