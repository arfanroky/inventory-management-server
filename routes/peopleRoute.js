const router = require('express').Router();
const peopleController = require('../controllers/peopleController');


// people add
router.post('/', peopleController.peopleAdd)

// single people get
router.get('/', peopleController.singleUser)

// update profile 
router.put('/', peopleController.updateProfile)

module.exports = router;



