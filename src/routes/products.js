// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const productsController = require('../controllers/productsController');
const { imageupload } = require('../middlewares/uploads');


/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create/', productsController.create); 
router.post('/create', imageupload.single('image'),productsController.store); 


/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id/', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id/', productsController.edit); 
router.put('/edit/:id',imageupload.single('image'), productsController.update);  


/*** DELETE ONE PRODUCT***/ 
router.get("/remove/:id",productsController.removeConfirm)
router.delete('/remove/:id', productsController.remove); 


module.exports = router;
