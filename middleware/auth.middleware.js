import { request, response } from 'express'
import JWT from 'jsonwebtoken'
import { config } from 'dotenv'

const validToken = async (req = request, res = response, next) => {
    try {
        const { authorization } = req.headers
        if (authorization && authorization.split(' ')[0] == 'Bearer') {
            const token = authorization.split(' ')[1]
            if (JWT.verify(token, config().parsed.SECRET)) {
                req.user = JWT.decode(token)
                next()
            }
        } else
            res.status(400).json({
                success: true,
                message: 'No hay token Bearer'
            })
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

export { validToken }