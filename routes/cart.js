const express = require('express')
const router = express.Router()
const products = require('../products.json')

let updatedCartIDs = []
router.post('/cart' , (req , res) => {
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

router.delete('/deleteCart' , (req , res) => {
  try {
    updatedCartIDs = []
    res.status(200).json({message: 'Warenkorb entfernt'})
  } catch (error) {
    return res.status(500).json({ message: 'Ein interner Serverfehler ist aufgetreten' });
  }
})

router.get('/updatedCart' , (req , res) => {

  try {
    if (updatedCartIDs.length === 0 ) {
      // console.log('delete reqest working')
      return res.status(400).json({message: 'Ihr Warenkorb ist leer'})
    }
    let cartList = []
    updatedCartIDs.forEach(id => {
      const numericID = Number(id)
      for (const cat of products) {
      const cartItem =  cat.products.find(product => product.id === numericID)
      if (cartItem) {
        cartList.push(cartItem)
        break
      }
      }
    })
    if (!cartList || cartList.length === 0) {
      return res.status(404).json({message: 'Die Produkte in Ihrem Warenkorb sind leider nicht mehr verfügbar'})
    }
    res.json(cartList)
    // console.log(cartList)
  } catch (error) {
    return res.status(500).json({ message: 'Ein interner Serverfehler ist aufgetreten' });
  }
})


module.exports = router
