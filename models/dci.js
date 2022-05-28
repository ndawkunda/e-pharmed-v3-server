import mongoose from 'mongoose'

const dciSchema = mongoose.Schema({
  name: {
    type: String,
    // required: true,
  },
  mecanisme: String,
  usage: String,
  link: String,
}, 
{
  timestamps: true
})

const Dci = mongoose.model('Dci', dciSchema)

export default Dci