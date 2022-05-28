import mongoose from 'mongoose'
import MedicalTerm from '../models/medicalTerm.js'

// @desc         Get all medicalTerms
// @route        GET /api/v1/medicalTerms
// @access       Public
export const getMedicalTerms = async (req, res) => {
  try {
    const PAGE_SIZE = 20
    const term = req.query.term || ''
    const page = parseInt(req.query.page || '1')
    const regex = new RegExp(`^${term}`, 'i')
    let total = 0
    let medicalTerms = {}
    if (term) {
      total = await MedicalTerm.find({ term: regex }).count()
      medicalTerms = await MedicalTerm.find({ term: regex })
        .limit(PAGE_SIZE)
        .skip(PAGE_SIZE * (page - 1))
    } else {
      total = await MedicalTerm.countDocuments()
      medicalTerms = await MedicalTerm.find()
        .limit(PAGE_SIZE)
        .skip(PAGE_SIZE * (page - 1))
    }

    res.status(200).json({
      page,
      total,
      pages: Math.ceil(total / PAGE_SIZE),
      medicalTerms,
    })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

// @desc         Get single medicalTerm
// @route        GET /api/v1/medicalTerms/:id
// @access       Public
export const getMedicalTerm = async (req, res) => {
  const { id: _id } = req.params

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send('MedicalTerm not found')

  try {
    const medicalTerm = await MedicalTerm.findById(_id)

    res.status(200).json(medicalTerm)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// @desc         Create new medicalTerm
// @route        POST /api/v1/medicalTerms
// @access       Private
export const createMedicalTerm = async (req, res) => {
  const newMedicalTerm = new MedicalTerm(req.body)

  try {
    await newMedicalTerm.save()

    res.status(201).json({ MedicalTerm: newMedicalTerm, message: 'New medicalTerm created' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// @desc         Update single medicalTerm
// @route        PUT /api/v1/medicalTerms/:id
// @access       Private
export const updateMedicalTerm = async (req, res) => {
  const { id: _id } = req.params

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send('MedicalTerm not found')

  try {
    const updatedMedicalTerm = await MedicalTerm.findByIdAndUpdate(_id, req.body, { new: true })

    res.status(201).json({ MedicalTerm: updatedMedicalTerm, message: 'MedicalTerm updated' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// @desc         Delete single medicalTerm
// @route        DELETE /api/v1/medicalTerms/:id
// @access       Private
export const deleteMedicalTerm = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).send('MedicalTerm not found')

  try {
    const deletedMedicalTerm = await MedicalTerm.findByIdAndRemove(req.params.id)

    res.status(201).json({ MedicalTerm: deletedMedicalTerm, message: 'MedicalTerm deleted' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}