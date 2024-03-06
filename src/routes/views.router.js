import { Router } from "express"
import ProductManager from "../services/ProductManager.js"

const viewsRouter = Router()

viewsRouter.get("/", (req,res) => {

    let products = ProductManager.getProductManager().getProducts()
    console.log(products)
    res.render('home', {products})
})

viewsRouter.get('/realtimeproducts', (req,res) => {
    let products = ProductManager.getProductManager().getProducts()
    console.log(products)
    res.render('realTimeProducts', {products})
})


export default viewsRouter