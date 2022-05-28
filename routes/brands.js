import express from 'express'

import {
  getBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,
} from '../controllers/brands.js'

const router = express.Router()

router.route('/').get(getBrands).post(createBrand)
router.route('/:id').get(getBrand).put(updateBrand).delete(deleteBrand)

export default router