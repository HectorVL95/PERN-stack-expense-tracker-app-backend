import { Router } from 'express';
import { createExpense, editExpense, deleteExpense, fetchExpenses, fetchExpenseInfo } from './expenseControllers';
import { authenticatedToken } from '../../middleware/authenticatedToken';
import { upload } from '../../middleware/multer';

const expenseRoutes = Router();
expenseRoutes.use(authenticatedToken)

expenseRoutes
  .post('/expense/:date_range_id', upload.single('image'), createExpense)
  .put('/expense/:id', editExpense)
  .delete('/expense/:id', deleteExpense)
  .get('/expense/:date_range_id', fetchExpenses)
  .get('/expense/single/:id', fetchExpenseInfo)

export default expenseRoutes