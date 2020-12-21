import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import cocktails from './data/cocktails.js'
import connectDB from './config/db.js'
import morgan from 'morgan'
import userRoutes from './routes/userRoutes.js'
import cocktailRoutes from './routes/cocktailRoutes.js'
import ingredientRoutes from './routes/ingredientRoutes.js'
import { errorHandle, notFound } from './middleware/errorMiddlerware.js'


dotenv.config()

connectDB()

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.json())

app.get('/', (req, res) => {
    res.send('API is running')
})

// app.get('/api/cocktails', (req, res) => {
//     res.json(cocktails)
// })

app.use('/api/users', userRoutes)
app.use('/api/cocktails', cocktailRoutes)
app.use('/api/ingredients', ingredientRoutes)

app.use(notFound)
app.use(errorHandle)


const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
