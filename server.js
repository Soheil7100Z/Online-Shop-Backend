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
    ],
    methods: ['GET', 'POST'],
    credentials: true
  }));

app.use('/' , productRouter)
app.use('/' , cartRouter)


app.listen(PORT ,() => console.log(`server is working ${PORT}`) )
