import express from 'express'
import cocktails from './data/cocktails.js'

const app = express();

app.use(express.json())

app.get('/', (req, res) => {
    res.send('API is running')
})

app.get('/api/cocktails', (req, res) => {
    res.json(cocktails)
})

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
