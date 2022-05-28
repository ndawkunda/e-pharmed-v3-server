import mongoose from 'mongoose'
import Dci from '../models/dci.js'

// @desc         Get all dcis
// @route        GET /api/v1/dcis
// @access       Public
export const getDcis = async (req, res) => {
  try {
    const PAGE_SIZE = 20
    const term = req.query.term || ''
    const page = parseInt(req.query.page || '1')
    const regex = new RegExp(`^${term}`, 'i')
    let total = 0
    let dcis = {}
    if (term) {
      total = await Dci.find({ name: regex }).count()
      dcis = await Dci.find({ name: regex })
        .limit(PAGE_SIZE)
        .skip(PAGE_SIZE * (page - 1))
    } else {
      total = await Dci.countDocuments()
      dcis = await Dci.find()
        .limit(PAGE_SIZE)
        .skip(PAGE_SIZE * (page - 1))
    }

    res.status(200).json({
      page,
      total,
      pages: Math.ceil(total / PAGE_SIZE),
      dcis,
    })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

// @desc         Get single dci
// @route        GET /api/v1/dcis/:id
// @access       Public
export const getDci = async (req, res) => {
  const { id: _id } = req.params

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send('Dci not found')

  try {
    const dci = await Dci.findById(_id)

    res.status(200).json(dci)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// @desc         Create new dci
// @route        POST /api/v1/dcis
// @access       Private
export const createDci = async (req, res) => {
  const newDci = new Dci(req.body)

  try {
    await newDci.save()

    res.status(201).json({ Dci: newDci, message: 'New dci created' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// @desc         Update single dci
// @route        PUT /api/v1/dcis/:id
// @access       Private
export const updateDci = async (req, res) => {
  const { id: _id } = req.params

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send('Dci not found')

  try {
    const updatedDci = await Dci.findByIdAndUpdate(_id, req.body, { new: true })

    res.status(201).json({ Dci: updatedDci, message: 'Dci updated' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// @desc         Delete single dci
// @route        DELETE /api/v1/dcis/:id
// @access       Private
export const deleteDci = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).send('Dci not found')

  try {
    const deletedDci = await Dci.findByIdAndRemove(req.params.id)

    res.status(201).json({ Dci: deletedDci, message: 'Dci deleted' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}