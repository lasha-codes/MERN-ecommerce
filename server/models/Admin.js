import mongoose from 'mongoose'

const Admin = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    color: { type: String, required: true },
    type: { type: String, required: true },
    messages: { type: Array },
    rating: { type: Number },
  },
  {
    timestamps: true,
  }
)

const AdminModel = mongoose.model('Admin', Admin)

export default AdminModel
