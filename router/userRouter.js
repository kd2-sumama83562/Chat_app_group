
const express = require('express');

const userController = require('../controllers/userController');
// const expenseController = require('../controllers/expense')

// const authenticatemiddleware = require('../middleware/auth');

const router = express.Router();


router.post('/signup', userController.signup);

router.post('/login', userController.login)

// router.post('/addExpense', authenticatemiddleware.authenticate, expenseController.addExpense )
// router.get('/getexpenses', authenticatemiddleware.authenticate, expenseController.getexpenses)
// router.delete('/deleteExpense/:expenseid', authenticatemiddleware.authenticate, expenseController.deleteExpense)


// //LeaderBoard Routes



module.exports = router;