import { Router } from 'express';
import { createDateRange, fetchDateRanges, modifyDateRange, deleteDateRange } from './dateRangeControllers';
import { authenticatedToken } from '../../middleware/authenticatedToken';

const dateRangeRoutes = Router()

dateRangeRoutes.use(authenticatedToken)

dateRangeRoutes
  .get('/date', fetchDateRanges)
  .post('/date', createDateRange)
  .put('/date', modifyDateRange)
  .delete('/date', deleteDateRange)

export default dateRangeRoutes;