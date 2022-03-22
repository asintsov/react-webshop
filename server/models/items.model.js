import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  type: { type: String, required: true },
  characteristics: { type: String, required: true },
  specification: { type: String, required: true },
  price: { type: String, required: true },
  quantity: { type: String, required: true },
  img: { type: String, required: true },
})

export default mongoose.model('Item', schema)
