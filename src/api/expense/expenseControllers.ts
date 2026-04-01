import { asyncHandler } from '../../utils/asyncHandler';
import { errorResponse } from '../../utils/errorResponse';
import { createExpenseQuery, editExpenseQuery, deleteExpenseQuery, fetchExpensesQuery,} from './expenseQueries';
import pool from '../../config/db';

export const createExpense = asyncHandler(async(req, res, next) => {
  const { name, amount, location, image } = req.body
  const created = await pool.query(createExpenseQuery, [name, amount, location, image ])

  if (created.rowCount === 0) {
    return next(new errorResponse('Expense not created', 400))
  }

  res.status(200).json({
    success: true,
    message: 'Expense created, successfully',
    data: created.rows[0]
  })
})

export const editExpense = asyncHandler(async(req, res, next) => {
  const { name, amount, location, image } = req.body
  const edited = await pool.query(editExpenseQuery, [name, amount, location, image])
  
  if (edited.rowCount === 0) {
    return next(new errorResponse('Expense to edit not found', 404))
  }

  res.status(200).json({
    success: true,
    message: 'Successfully edited expense',
    data: edited.rows[0]
  })

})

export const deleteExpense = asyncHandler(async(req, res, next) => {
  const {id} = req.body
  const deleted = await pool.query(deleteExpenseQuery, [id])

  if (deleted.rowCount === 0) {
    return next(new errorResponse('Expense to delete not ound', 404))
  }  

  res.status(200).json({
    success: true,
    message: 'Succesfully deleted expense',
    data: deleted.rows[0]
  })

})

export const fetchExpenses = asyncHandler(async(req, res, next) => {
  const { date_range_id } = req.body
  const fetched = await pool.query(fetchExpensesQuery, [date_range_id])

  if (fetched.rowCount === 0) {
    return next(new errorResponse('Expenses do not exist for this date range', 404))
  }

  res.status(200).json({
    success: true,
    message: 'Successfuly found Expenses',
    data: fetched.rows
  })
})