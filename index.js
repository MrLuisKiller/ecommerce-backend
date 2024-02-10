import express, { json } from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import { dbConnection } from './database/config.js'
import { userRoutes } from './routes/user.router.js'
import { productRoutes } from './routes/product.routes.js'

const app = express()
const PORT = config().parsed.PORT

app.use(json())
app.use(cors({ 'Access-Control-Allow-Origin': '*' }))

app.get('/api', (req, res) => res.send('API Ecommerce Proyecto 5 Bootcamp FullStack'))

; (async () => {
    await dbConnection()
    app.use('/api/user', userRoutes)
    app.use('/api/products', productRoutes)
})()

app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`))