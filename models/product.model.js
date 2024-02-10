import { Schema, model } from 'mongoose'

const productsSchema = Schema({
    name: { type: String },
    description: { type: String },
    image: { type: String },
    price: { type: Number },
    active: { type: Boolean }
}, { versionKey: false })

const productModel = model('Product', productsSchema)

export { productModel }