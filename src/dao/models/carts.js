import mongoose, { Schema, SchemaTypes } from "mongoose"

const cartsCollection= "carts"
const cartsSchema = new Schema(
    {
        products: [
            {
                product: {
                    type: SchemaTypes.ObjectId,
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

export const cartsModel = mongoose.model(cartsCollection, cartsSchema)