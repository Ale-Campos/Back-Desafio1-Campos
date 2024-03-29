import { productsModel } from '../dao/models/products.js'
import __dirname from '../utils/dirname.js'
import fs, { cp } from 'fs'

export default class ProductManager {

    static totalProductCounter = 0
    static productManager

    constructor(){
        this.path = __dirname + '/../database/products.json'
    }

    static getProductManager() {
        if(ProductManager.productManager == undefined) {
            ProductManager.productManager = new ProductManager()
        }
        return ProductManager.productManager
    }

    isProductValid(product) {
        if(product.title != undefined &&
            product.description != undefined &&
            product.code != undefined &&
            product.price != undefined &&
            product.status != undefined &&
            product.stock != undefined &&
            product.category != undefined) {
                return true
            } else {
                return false
            }
    }

    static async getProducts(limit, page, query, sort) {
        console.log(sort)
        console.log(query)
        let filter = {};
        if(query) {
            query = query.toLowerCase()
            query=='true' || query == 'false'? filter = {status: query} : filter= {category: query}  
            
        }
        let sortObj= {}
        if(sort){
            sort = sort.toLowerCase()
            sortObj = {price: sort}
            
        }
        console.log(sortObj)
        let products = await productsModel.paginate(filter, {limit, page, sort: sortObj, lean:true})
        return products
    }

    static async getProductByCode(code) {
        try {
           return await productsModel.find({code})
        } catch(error) {
            throw new Error(error)
        }
    }
    
    static async getProductById(id) {
        try {
           return await productsModel.findById(id)
        } catch(error) {
            console.log(error)
            throw new Error("Error while excecuting DB Query")
        }
    }

    static async addProduct(product){
        try {

            let newProduct = new productsModel({
                ...product
            })
            await newProduct.save()
            return newProduct
        } catch(error) {
            console.log(error)
            throw new Error(error)
        }
    }
    
    static async updateProduct(id, product) {
        let result = {result: true, error: ''}
        if(id && product) {
            try {
                await productsModel.updateOne({_id:id}, product)
                result.updateProduct = product
            } catch(error) {
                console.log(error)
                console.log("Error while updating product")
                result = {result: false, error: "Error while updating product"}
            }
        } else {
            result = {result: false, error: 'No se pudo actualizar el producto, verifique los datos ingresados'}
        }
        return result
    }

    static async removeProduct(id) {
        let result = {result: true, error: ''}
        try {

            if(id) {
                await productsModel.deleteOne({_id:id})    
            } else {
                result.result = false
                result.error = 'No se pudo eliminar el producto, verifique los datos ingresados'
            }
        return result
        } catch(error) {
            console.log(error)
            throw new Error(error)
        }
    }
}
