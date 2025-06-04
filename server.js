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
    return res.status(500).json({ message: 'Ein interner Serverfehler ist aufgetreten' });
  }
})


app.get('/products/:id' , (req , res) =>{
  const { id } = req.params
  if (isNaN(id)) {
    return res.status(400).send('Ungültige Produkt-ID');
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
         return res.status(404).send('Produkt nicht gefunden');
          }

        return res.json(foundItem);

        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: 'Ein interner Serverfehler ist aufgetreten' });
        }
    })

let updatedCartIDs = []
app.post('/cart' , (req , res) => {
  try {
    const IDs = req.body
    if (!Array.isArray(IDs)) {
      return res.status(400).json({message: 'Ungültige Data-type'})
    }
    updatedCartIDs = IDs
    res.status(200).json({message: 'Warenkorb erhalten'})
    // console.log(IDs)
  } catch (error) {
    return res.status(500).json({ message: 'Ein interner Serverfehler ist aufgetreten' });
  }
})

app.get('/updatedCart' , (req , res) => {
  try {
    if (updatedCartIDs.length === 0) {
      res.status(400).json({message: 'Ihr Warenkorb ist leer'})
    }
    res.json(updatedCartIDs)
  } catch (error) {
    return res.status(500).json({ message: 'Ein interner Serverfehler ist aufgetreten' });
  }
})
app.listen(PORT ,() => console.log(`server is working ${PORT}`) )
