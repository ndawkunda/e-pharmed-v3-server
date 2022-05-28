import mongoose from 'mongoose'
import Officine from '../models/officine.js'

// @desc         Get all officines
// @route        GET /api/v1/officines
// @access       Public
export const getOfficines = async (req, res) => {
  try {
    const PAGE_SIZE = 20
    const term = req.query.term || ''
    const page = parseInt(req.query.page || '1')
    const regex = new RegExp(`^${term}`, 'i')
    let total = 0
    let officines = {}
    if (term) {
      total = await Officine.find({ name: regex }).count()
      officines = await Officine.find({ name: regex })
        .limit(PAGE_SIZE)
        .skip(PAGE_SIZE * (page - 1))
    } else {
      total = await Officine.countDocuments()
      officines = await Officine.find()
        .limit(PAGE_SIZE)
        .skip(PAGE_SIZE * (page - 1))
    }

    res.status(200).json({
      page,
      total,
      pages: Math.ceil(total / PAGE_SIZE),
      officines,
    })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

// @desc         Get single officine
// @route        GET /api/v1/officines/:id
// @access       Public
export const getOfficine = async (req, res) => {
  const { id: _id } = req.params

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send('Officine not found')

  try {
    const officine = await Officine.findById(_id)

    res.status(200).json(officine)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// @desc         Create new officine
// @route        POST /api/v1/officines
// @access       Private
export const createOfficine = async (req, res) => {
  const newOfficine = new Officine(req.body)

  try {
    await newOfficine.save()

    res.status(201).json({ Officine: newOfficine, message: 'New officine created' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// @desc         Update single officine
// @route        PUT /api/v1/officines/:id
// @access       Private
export const updateOfficine = async (req, res) => {
  const { id: _id } = req.params

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send('Officine not found')

  try {
    const updatedOfficine = await Officine.findByIdAndUpdate(_id, req.body, { new: true })

    res.status(201).json({ Officine: updatedOfficine, message: 'Officine updated' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// @desc         Delete single officine
// @route        DELETE /api/v1/officines/:id
// @access       Private
export const deleteOfficine = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).send('Officine not found')

  try {
    const deletedOfficine = await Officine.findByIdAndRemove(req.params.id)

    res.status(201).json({ Officine: deletedOfficine, message: 'Officine deleted' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}