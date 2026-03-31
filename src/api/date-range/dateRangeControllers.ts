import { asyncHandler } from '../../utils/asyncHandler';
import { errorResponse } from '../../utils/errorResponse';
import { authenticatedRequest } from '../../utils/specialRequests';
import pool from '../../config/db';
import { createDateRangeQuery, modifyDateRangeQuery, deleteDateRangeQuery } from './dateRangeQueries';

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

export const modifyDateRange = asyncHandler(async(req, res, next) => {
    const { from_date, to_date, budget } = req.body

    const updateRange = await pool.query(
      modifyDateRangeQuery,
      [from_date, to_date, budget]
    )

    res.status(201).json({
      sucess: false,
      message: 'Successfully edited date range',
      data: updateRange
    })

})

export const deleteDateRange = asyncHandler(async(req, res ,next) => {

})



