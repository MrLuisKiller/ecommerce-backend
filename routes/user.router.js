import { Router } from 'express'
import { validToken } from '../middleware/auth.middleware.js'
import { usersPost, loginPost, usersPut } from '../controllers/user.controller.js'

const router = Router()

router.post('/signup', usersPost)

router.post('/login', loginPost)

router.put('/update', validToken, usersPut)

export { router as userRoutes }