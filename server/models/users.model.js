import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  name: { type: String },
  gender: { type: String },
  email: { type: String },
  phone: { type: String },
  login: { type: String, required: true },
  password: { type: String, required: true },
  token: { type: String },
  basket: { type: [] },
})

export default mongoose.model('User', schema)
