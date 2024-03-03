import UserModel from '../models/User.js'
import AdminModel from '../models/Admin.js'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

export const registerController = async (req, res) => {
  const { email, password, username, base64 } = req.body

  const hashedPassword = await bcrypt.hash(password, 10)

  const dupEmail = await UserModel.findOne({ email })
  if (dupEmail) {
    return res.status(400).json({ message: 'This user already exists' })
  }
  const dupUsername = await UserModel.findOne({ password })
  if (dupUsername) {
    return res.status(400).json({ message: 'This user already exists' })
  }

  const user = await UserModel.create({
    email: email,
    username: username,
    password: hashedPassword,
    avatar: base64,
  })

  jwt.sign({ username, email }, process.env.JWT_TOKEN, {}, (err, token) => {
    if (err) {
      return res.status(400).json({ message: 'Something went wrong' })
    }
    res.status(200).json({
      email: user.email,
      username: user.username,
      message: 'U have successfully created an account',
    })
  })
}

export const getProfileController = (req, res) => {
  const { token } = req.cookies
  jwt.verify(token, process.env.JWT_TOKEN, {}, async (err, token) => {
    const { username } = token
    if (err) {
      return res.status(401).json({ message: 'Unauthorized Request' })
    }
    const loggerUser = await UserModel.findOne(username)
    res.status(200).json({ loggerUser: loggerUser })
  })
}

export const uploadProductAdmin = async (req, res) => {
  const { productTitle, productDescription, productImage, productPrice } =
    req.body
  const createdProduct = await AdminModel.create({
    title: productTitle,
    description: productDescription,
    image: productImage,
    price: productPrice,
  })
  res.status(200).json(createdProduct)
}
