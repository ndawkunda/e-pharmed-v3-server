import express from 'express'

import {
  getDcis,
  getDci,
  createDci,
  updateDci,
  deleteDci,
} from '../controllers/dcis.js'

const router = express.Router()

router.route('/').get(getDcis).post(createDci)
router.route('/:id').get(getDci).put(updateDci).delete(deleteDci)

export default router
