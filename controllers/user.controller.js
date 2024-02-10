import { request, response } from 'express'
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'
import { config } from 'dotenv'
import { userModel } from '../models/user.model.js'

const salt = 10

const usersPost = async (req = request, res = response) => {
    const { body } = req
    let user = userModel(body)
    user.password = await bcrypt.hash(user.password, salt)
    await user.save()
    res.json({
        success: true,
        message: 'Cuenta Creada'
    })
}

const loginPost = async (req = request, res = response) => {
    const { body } = req
    const userInfo = await userModel.findOne({ email: body.email, active: true })
    if (userInfo == null)
        return res.status(400).json({
            success: false,
            message: 'User not found or not active'
        })
    else {
        const comparePassword = await bcrypt.compare(body.password, userInfo.password)
        if (!comparePassword)
            return res.status(400).json({
                success: false,
                message: 'Invalid password'
            })
        else {
            const { id, name, lastName, email, dob, admin } = userInfo
            const payload = {
                id,
                name,
                lastName,
                email,
                dob,
                admin
            }
            const token = JWT.sign(payload, config().parsed.SECRET)
            res.json({
                success: true,
                message: 'Login success',
                token
            })
        }
    }
}

const usersPut = async (req = request, res = response) => {
    const { id } = req.user
    const data = req.body
    if (data.password != null || data.password != "") {
        data.password = await bcrypt.hash(data.password, salt)
        const updatedUser = await userModel.findByIdAndUpdate(id, data, { new: true })
        const { _id, name, lastName, email, dob, admin } = updatedUser
        const payload = {
            id: _id,
            name,
            lastName,
            email,
            dob,
            admin
        }
        const token = JWT.sign(payload, config().parsed.SECRET)
        res.json({
            success: true,
            message: 'Usuario actualizado',
            token
        })
    } else
        res.status(400).json({
            success: false,
            message: 'Error'
        })
}

export { usersPost, loginPost, usersPut }