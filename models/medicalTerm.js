import mongoose from 'mongoose'

const medicalTermSchema = mongoose.Schema({
  term: {
    type: String,
    // required: true,
  },
  definition: String,
  link: String,
}, 
{
  timestamps: true
})

const MedicalTerm = mongoose.model('MedicalTerm', medicalTermSchema)

export default MedicalTerm