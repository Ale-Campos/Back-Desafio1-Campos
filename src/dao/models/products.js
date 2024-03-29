import mongoose, { Schema } from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"
const productsCollection= "products"
const productsSchema= new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: String,
        code: {
            type: String, 
            required: true,
            unique: true
        },
        price: {
            type: Number,
            required: true
        },
        status: Boolean,
        stock: Number,
        category: {
            type: String,
            required: true
        },
        thumbnail: []
    }
)

productsSchema.plugin(mongoosePaginate)

export const productsModel = mongoose.model(productsCollection, productsSchema)