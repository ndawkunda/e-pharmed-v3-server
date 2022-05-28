import mongoose from 'mongoose'
import Brand from '../models/brand.js'

// @desc         Get all brands
// @route        GET /api/v1/brands
// @access       Public
export const getBrands = async (req, res) => {
  try {
    const PAGE_SIZE = 20
    const term = req.query.term || ''
    const page = parseInt(req.query.page || '1')
    const regex = new RegExp(`^${term}`, 'i')
    let total = 0
    let brands = {}
    if (term) {
      total = await Brand.find({ name: regex }).count()
      brands = await Brand.find({ name: regex })
        .limit(PAGE_SIZE)
        .skip(PAGE_SIZE * (page - 1))
    } else {
      total = await Brand.countDocuments()
      brands = await Brand.find()
        .limit(PAGE_SIZE)
        .skip(PAGE_SIZE * (page - 1))
    }

    res.status(200).json({
      page,
      total,
      pages: Math.ceil(total / PAGE_SIZE),
      brands,
    })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

// @desc         Get single brand
// @route        GET /api/v1/brands/:id
// @access       Public
export const getBrand = async (req, res) => {
  const { id: _id } = req.params

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send('Brand not found')

  try {
    const brand = await Brand.findById(_id)

    res.status(200).json(brand)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// @desc         Create new brand
// @route        POST /api/v1/brands
// @access       Private
export const createBrand = async (req, res) => {
  const newBrand = new Brand(req.body)

  try {
    await newBrand.save()

    res.status(201).json({ Brand: newBrand, message: 'New brand created' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// @desc         Update single brand
// @route        PUT /api/v1/brands/:id
// @access       Private
export const updateBrand = async (req, res) => {
  const { id: _id } = req.params

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send('Brand not found')

  try {
    const updatedBrand = await Brand.findByIdAndUpdate(_id, req.body, { new: true })

    res.status(201).json({ Brand: updatedBrand, message: 'Brand updated' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// @desc         Delete single brand
// @route        DELETE /api/v1/brands/:id
// @access       Private
export const deleteBrand = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).send('Brand not found')

  try {
    const deletedBrand = await Brand.findByIdAndRemove(req.params.id)

    res.status(201).json({ Brand: deletedBrand, message: 'Brand deleted' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}