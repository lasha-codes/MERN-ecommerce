import mongoose from 'mongoose'

const User = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  username: { type: String, unique: true, required: true, minlength: 3 },
  password: { type: String, required: true },
  gender: { type: String },
  avatar: { type: String },
  isAdmin: { type: Boolean },
  messages: [
    {
      title: String,
      username: String,
      comment: String,
      rating: Number,
    },
  ],
})

const UserModel = mongoose.model('User', User)

export default UserModel
