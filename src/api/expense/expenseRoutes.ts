import { Router } from 'express';
import { createExpense, editExpense, deleteExpense, fetchExpenses } from './expenseControllers';
import { authenticatedToken } from '../../middleware/authenticatedToken';

const expenseRoutes = Router();
expenseRoutes.use(authenticatedToken)

expenseRoutes
  .post('/expense', createExpense)
  .put('/expense', editExpense)
  .delete('/expense', deleteExpense)
  .get('expense', fetchExpenses)

export default expenseRoutes