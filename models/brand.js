import mongoose from 'mongoose'

const brandSchema = mongoose.Schema(
  {
    name: {
      type: String,
      // required: true,
    },
    dci: String,
    indications: String,
    dosage: String,
    effets_indes: String,
    contre_indic: String,
    precautions: String,
    interactions: String,
    surdosage: String,
    grossesse_allaitement: String,
    aspect_forme: String,
    composition: String,
    mecanisme: String,
    autres_info: String,
    removed: String,
    link: String,
  },
  {
    timestamps: true,
  }
)

const Brand = mongoose.model('Brand', brandSchema)

export default Brand
