import express from 'express'

import {
  getOfficines,
  getOfficine,
  createOfficine,
  updateOfficine,
  deleteOfficine,
} from '../controllers/officines.js'

const router = express.Router()

router.route('/').get(getOfficines).post(createOfficine)
router.route('/:id').get(getOfficine).put(updateOfficine).delete(deleteOfficine)

export default router
