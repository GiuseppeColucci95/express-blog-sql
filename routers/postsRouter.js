//import express library
const express = require('express');
//create an instance of router
const router = express.Router();

//import posts controller
const postsController = require('../controllers/postsController');

//index
router.get('/', postsController.index);

//show
router.get('/:slug', postsController.show);

//store
router.post('/', postsController.store);

//update
router.put('/:slug', postsController.update);

//modify
router.patch('/:slug', postsController.modify);

//delete
router.delete('/:slug', postsController.destroy);

//export router
module.exports = router;