import { Router } from 'express'
import { productGet, productsPost, productsPut, productsDelete } from '../controllers/product.controller.js'
import { validToken } from '../middleware/auth.middleware.js'

const router = Router()

router.get('/', productGet)

router.get('/:id', productGet)

router.post('/create', validToken, productsPost)

router.put('/update', validToken, productsPut)

router.delete('/delete', validToken, productsDelete)

export { router as productRoutes }