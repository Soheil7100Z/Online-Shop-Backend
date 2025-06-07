const express = require('express')
const router = express.Router()
const products = require('../products.json')

router.get('/products' , (req , res) =>{
  try {
    res.json(products)
  } catch (error) {
    return res.status(500).json({ message: 'Ein interner Serverfehler ist aufgetreten' });
  }
})

router.get('/products/:id' , (req , res) =>{
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

module.exports = router
