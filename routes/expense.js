const path = require('path');

const express = require('express');

const expenseController = require('../controllers/expense');

const router = express.Router();

router.post('/expense/add-expense',expenseController.postAddExpense);

router.get('/expense/get-expenses',expenseController.getExpenses);

router.delete('/expense/delete-expense',expenseController.deleteExpense);

router.put('/expense/edit',expenseController.postEditExpense);

module.exports=router;