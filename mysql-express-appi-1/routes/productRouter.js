const express = require('express');
const pc = require('picocolors');
const { addProductImage, getPathById } = require('../controllers/productsControllers');
const productsRouter = express.Router();

productsRouter.use('/', (req, res, next) => {
    console.log(pc.green('Enable middleware in products'));
    next();
})

productsRouter.get('/:id', getPathById)
productsRouter.post('/image', addProductImage)

module.exports=productsRouter;