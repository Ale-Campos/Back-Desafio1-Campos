import mongoose, { Schema, SchemaTypes } from "mongoose"

const cartsCollection= "carts"
const cartsSchema = new Schema(
    {
        products: [
            {
                product: {
                    type: SchemaTypes.ObjectId,
                    ref: 'products',
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ]
    }
)

cartsSchema.pre('find', function() {
    this.populate('products.product')
})

cartsSchema.pre('findOne', function() {
    this.populate('products.product')
})

export const cartsModel = mongoose.model(cartsCollection, cartsSchema)