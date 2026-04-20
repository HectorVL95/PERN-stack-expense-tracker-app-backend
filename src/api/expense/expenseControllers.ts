import pool from '../../config/db';
import { asyncHandler } from '../../utils/asyncHandler';
import { errorResponse } from '../../utils/errorResponse';
import { createExpenseQuery, editExpenseQuery, deleteExpenseQuery, fetchExpensesQuery,fetchExpenseQueryInfo, updateImage } from './expenseQueries';
import { uploadToCloudinary } from '../../utils/uploadToCloudinary';

export const createExpense = asyncHandler(async(req, res, next) => {
  const { date_range_id } = req.params
  const { name, amount, location } = req.body
  const image = req.file
  
  const created = await pool.query(createExpenseQuery, [date_range_id , name, amount, location, null])

  if (created.rowCount === 0) {
    return next(new errorResponse('Expense not created', 400))
  }

  const expense = created.rows[0]

  if (image) {
    try {
      const imageUrl = await uploadToCloudinary(image, `expenseImage/${expense.id}`)
      await pool.query(
        updateImage, [imageUrl, expense.id]
      )

      console.log(imageUrl)

      expense.image = imageUrl
    } catch (error) {
      console.log('Unable to upload picture:', error)
    }
  }

  res.status(200).json({
    success: true,
    message: 'Expense created, successfully',
    data: created.rows[0]
  })
})

export const editExpense = asyncHandler(async(req, res, next) => {
  const { id } = req.params
  const { name, amount, location, image } = req.body

   const fetchedInfo = await pool.query(fetchExpenseQueryInfo, [id])

  if (fetchedInfo.rowCount === 0) {
    return next(new errorResponse('Expense info does not exist', 404))
  }

  const edited = await pool.query(editExpenseQuery, [id, name, amount, location, null])

  const expense = edited.rows[0]

  if (image) {
    try {
      const imageUrl = await uploadToCloudinary(image, `expenseImage/${expense.id}`) 
      await pool.query(
        updateImage, [expense.id, imageUrl]
      )

      expense.image = imageUrl
    } catch (error) {
      console.log('Unable to upload picture:', error)
    }
  }
  
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
  const { id } = req.params
  const { date_range_id } = req.query
  const deleted = await pool.query(deleteExpenseQuery, [id, date_range_id])

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
  const { date_range_id } = req.params
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

export const fetchExpenseInfo = asyncHandler(async(req, res, next) => {
  const { id } = req.params
  const fetchedInfo = await pool.query(fetchExpenseQueryInfo, [id])

  if (fetchedInfo.rowCount === 0) {
    return next(new errorResponse('Expense info does not exist', 404))
  }

  res.status(200).json({
    success: false,
    message: 'Fetched expense info',
    data: fetchedInfo.rows[0]
  })
})