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
  try {
    res.json(products)
  } catch (error) {
    res.status(500).send('Internal server error')
  }
})

app.get('/products/:id' , (req , res) =>{
  const { id } = req.params
  if (isNaN(id)) {
    return res.status(400).send('Invalid product ID');
  }
  const ID = parseInt(id);
      try {
      let foundItem = null;
      products.forEach(cat =>{
        const item = cat.products.find(p => p.id === ID);
          if (item) {
            foundItem = item;
          }
        })
         if (!foundItem) {
         return res.status(404).send('Product not found');
          }

        return res.json(foundItem);

        } catch (error) {
           console.error(error);
           return res.status(500).send('Internal server error');
        }
    })

app.listen(PORT ,() => console.log(`server is working ${PORT}`) )
