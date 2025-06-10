require('dotenv').config();
const express = require('express')
const app = express()
const cors = require('cors');
const PORT = process.env.PORT || 3200;
const productRouter = require('./routes/products.js')
const cartRouter = require('./routes/cart')

app.use(express.json())

app.use(cors({
    origin: [
      'http://localhost:5200',
      'http://online-shop-frontend-omega.vercel.app'
    ],
    methods: ['GET', 'POST' , 'DELETE'],
    credentials: true
  }));

app.use('/' , productRouter)
app.use('/' , cartRouter)
app.get('/' , (req , res) => {
  res.send('The server is working')
})

app.listen(PORT ,() => console.log(`server is working ${PORT}`) )
