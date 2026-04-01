import { asyncHandler } from '../../utils/asyncHandler';
import { errorResponse } from '../../utils/errorResponse';
import { authenticatedRequest } from '../../utils/specialRequests';
import pool from '../../config/db';
import { createDateRangeQuery, modifyDateRangeQuery, deleteDateRangeQuery, fetchDateRangeQuery } from './dateRangeQueries';

export const createDateRange = asyncHandler(async(req, res) => {
  const { userId } = (req as authenticatedRequest).user!
  const { from_date, to_date, budget } = req.body
 
  await pool.query( 
    createDateRangeQuery
    , [userId, from_date, to_date, budget])

  res.status(201).json({
    success: true,  
    message: 'Successfully crated date range'
  })

})

export const fetchDateRanges  = asyncHandler(async(req, res, next) => {
  const { userId } = (req as authenticatedRequest).user!

  const fetched = await pool.query(
    fetchDateRangeQuery, [userId]
  )

  if (fetched.rowCount === 0) {
    return next(new errorResponse('There are no date ranges', 404))
  }

  res.status(200).json({
    success: true,
    message: 'Succesfully fetched data ranges',
    data: fetched.rows
  })
})

export const modifyDateRange = asyncHandler(async(req, res, next) => {
  const { userId } = (req as authenticatedRequest).user!
  const { from_date, to_date, budget, id } = req.body

  const updateRange = await pool.query(
    modifyDateRangeQuery,
    [from_date, to_date, budget, id, userId]
  )

  if (updateRange.rowCount === 0) {
    return next(new errorResponse('Unable to update it', 404))
  }

  res.status(200).json({
    sucess: true,
    message: 'Successfully edited date range',
    data: updateRange.rows[0]
  })
})

export const deleteDateRange = asyncHandler(async(req, res , next) => {
  const { id } = req.body
  const { userId } = (req as authenticatedRequest).user!

  const deleteRange = await pool.query(deleteDateRangeQuery, [id, userId])

  if (deleteRange.rowCount === 0) {
    return next(new errorResponse('Date range not found', 404))
  }

  res.status(200).json({
    success: true,
    message: 'Succesfully deleted the date range',
    data: deleteRange.rows[0]
  })
})

