import mongoose from 'mongoose'

const User = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  username: { type: String, unique: true, required: true, minlength: 3 },
  password: { type: String, required: true },
  gender: { type: String },
  avatar: { type: String },
  isAdmin: { type: Boolean },
  messages: { type: String },
  cart: [
    {
      productTitle: { type: String, required: true },
      productImage: { type: String, required: true },
      productPrice: { type: String, required: true },
      productType: { type: String },
      productColor: { type: String },
      productCount: { type: Number, required: true },
    },
  ],
})

const UserModel = mongoose.model('User', User)

export default UserModel
