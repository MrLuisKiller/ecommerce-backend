import { Schema, model } from 'mongoose'

const usersSchema = Schema({
    name: { type: String },
    lastName: { type: String },
    email: { type: String },
    password: { type: String },
    admin: { type: Boolean },
    dob: { type: Date },
    active: { type: Boolean },
    notes: { type: String }
}, { versionKey: false })

const userModel = model('User', usersSchema)

export { userModel }