require('dotenv').config();
const express = require('express')
const app = express()
const {engine} = require('express-handlebars')
const cors = require('cors');
const PORT = process.env.PORT || 3200;
const products = require('./products.json')


app.engine('handlebars' , engine())
app.set('view engine' , 'handlebars')
app.use(express.json())

app.use(cors({
    origin: [
      'http://localhost:5200',
    ],
    methods: ['GET', 'POST'],
    credentials: true
  }));



app.get('/', (req, res) => {
  res.send('Backend is working');
});

app.get('/products' , (req , res) =>{
    res.json(products)
})

app.get('/products/:id' , (req , res) =>{
  const { id } = req.params
  const ID = parseInt(id);
      products.forEach(cat =>{
        const item = cat.products.find(p => p.id === ID);
        res.json(item)
      })
    })


app.listen(PORT ,() => console.log(`server is working ${PORT}`) )
