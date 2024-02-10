import { request, response } from 'express'
import { productModel } from '../models/product.model.js'

const productGet = async (req = request, res = response) => {
    const { id } = req.params
    let products = []
    if (id)
        products = await productModel.findById(id)
    else
        products = await productModel.find()
    res.json({
        success: true,
        message: 'Producto/s encontrado/s',
        data: products
    })
}

const productsPost = async (req = request, res = response) => {
    const { body } = req
    const { admin } = req.user
    if (admin) {
        let product = productModel(body)
        await product.save()
        res.json({
            success: true,
            message: 'Producto agregado correctamente'
        })
    } else
        res.status(400).json({
            success: false,
            message: 'Invalid token'
        })
}

const productsPut = async (req = request, res = response) => {
    const { id, data } = req.body
    const { admin } = req.user
    if (admin) {
        await productModel.findByIdAndUpdate(id, data, { new: true })
        res.json({
            success: true,
            message: 'Producto actualizado'
        })
    } else
        res.status(400).json({
            success: false,
            message: 'Invalid token'
        })
}

const productsDelete = async (req = request, res = response) => {
    const { id } = req.body
    const { admin } = req.user
    if (admin) {
        await productModel.findByIdAndDelete(id)
        res.json({
            success: true,
            message: 'Producto eliminado'
        })
    } else
        res.status(400).json({
            success: false,
            message: 'Invalid token'
        })
}

export { productGet, productsPost, productsPut, productsDelete }