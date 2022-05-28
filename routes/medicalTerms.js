import express from 'express'

import {
  getMedicalTerms,
  getMedicalTerm,
  createMedicalTerm,
  updateMedicalTerm,
  deleteMedicalTerm,
} from '../controllers/medicalTerms.js'

const router = express.Router()

router.route('/').get(getMedicalTerms).post(createMedicalTerm)
router.route('/:id').get(getMedicalTerm).put(updateMedicalTerm).delete(deleteMedicalTerm)

export default router
