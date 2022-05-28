import mongoose from 'mongoose'

const officineSchema = mongoose.Schema({
  pharmacie: {
    type: String,
    // required: true,
  },
  region: String,
  ville: String,
  adresse: String,
  tel: String,
  titre: String,
  nom: String,
  prenom: String,
}, 
{
  timestamps: true
})

const Officine = mongoose.model('Officine', officineSchema)

export default Officine