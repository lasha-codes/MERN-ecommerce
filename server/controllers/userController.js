import UserModel from '../models/User.js'
import AdminModel from '../models/Admin.js'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config()

export const registerController = async (req, res) => {
  const { email, password, username, gender } = req.body

  const hashedPassword = await bcrypt.hash(password, 10)

  const dupEmail = await UserModel.findOne({ email })
  const dupUsername = await UserModel.findOne({ username })

  if (dupEmail || dupUsername) {
    return res.status(400).json({ message: 'This user already exists' })
  }

  await UserModel.create({
    email: email,
    username: username,
    password: hashedPassword,
    gender: gender,
  })

  jwt.sign({ username, email }, process.env.JWT_SECRET, {}, (err, token) => {
    if (err) {
      return res.status(400).json({ message: 'Something went wrong' })
    }
    res.cookie('token', token).status(200).json({
      message: 'U have successfully created an account',
    })
  })
}

export const loginController = async (req, res) => {
  const { email, password } = req.body

  const existsUser = await UserModel.findOne({ email })
  if (!existsUser) {
    return res
      .status(400)
      .json({ message: 'User with this email does`t exist' })
  }
  const passwordMatched = await bcrypt.compare(password, existsUser.password)
  if (passwordMatched) {
    jwt.sign(
      { email, username: existsUser.username },
      process.env.JWT_SECRET,
      {},
      (err, token) => {
        if (err)
          return res.status(500).json({ message: 'Internal server error' })
        res.cookie('token', token).json({ existsUser })
      }
    )
  } else {
    res.status(400).json({ message: 'password is incorrect' })
  }
}

export const getProfileController = async (req, res) => {
  const { token } = req.cookies
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, token) => {
      if (err) throw err
      const { email } = token
      const loggerUser = await UserModel.findOne({ email })

      const allProducts = await AdminModel.find({}).sort({ createdAt: -1 })

      if (loggerUser) {
        res.status(200).json({
          username: loggerUser.username,
          email: loggerUser.email,
          gender: loggerUser.gender,
          isAdmin: loggerUser.isAdmin || false,
          avatar: loggerUser.avatar ? loggerUser.avatar : '',
          allProducts: allProducts,
        })
      }
    })
  } else {
    const allProducts = await AdminModel.find({}).sort({ createdAt: -1 })
    res.status(200).json({
      allProducts: allProducts,
    })
  }
}

export const logoutUser = (req, res) => {
  const { token } = req.cookies
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized request' })
  }
  res
    .cookie('token', '')
    .status(200)
    .json({ message: 'User has successfully logged out' })
}

export const uploadProductAdmin = async (req, res) => {
  const {
    productTitle,
    productDescription,
    productImage,
    productPrice,
    productColor,
    productType,
  } = req.body

  try {
    if (
      !productTitle ||
      !productDescription ||
      !productImage ||
      !productColor ||
      !productPrice
    ) {
      return res.status(400).json({ message: 'Please fill out all fields' })
    }

    const createdProduct = await AdminModel.create({
      title: productTitle,
      description: productDescription,
      image: productImage,
      price: productPrice,
      color: productColor,
      type: productType,
    })
    res.status(200).json(createdProduct)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

export const userPhotoUpload = (req, res) => {
  const { token } = req.cookies
  const { base64 } = req.body

  try {
    if (!base64) return res.status(400).json({ message: 'photo not defined' })
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
      const { email } = info
      if (err) throw err
      console.log(email)
      const userToUpdate = await UserModel.findOne({ email })
      if (!userToUpdate) {
        return res.status(400).json({ message: 'Bad request' })
      }
      userToUpdate.avatar = base64
      await userToUpdate.save()
      res.status(200).json({ message: 'upload successful' })
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error, try again.' })
  }
}

export const becomeAdmin = async (req, res) => {
  const { token } = req.cookies
  try {
    if (!token) {
      res.status(401).json({ message: 'Unauthorized request' })
    }
    const { admin_key } = req.body
    const { email } = jwt.verify(token, process.env.JWT_SECRET)
    const secretMatch = admin_key === process.env.ADMIN_KEY
    const loggedUser = await UserModel.findOne({ email })
    if (!loggedUser) {
      return res.status(400).json({ message: 'Bad request' })
    }
    if (secretMatch) {
      loggedUser.isAdmin = true
      await loggedUser.save()
      res.status(200).json({ message: 'User has become admin' })
    } else {
      res.status(400).json({ message: 'key does not match' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const quitBeingAdmin = async (req, res) => {
  try {
    const { token } = req.cookies
    if (!token) return res.status(401).json({ message: 'Unauthorized request' })
    const { email } = jwt.verify(token, process.env.JWT_SECRET)
    const signedUser = await UserModel.findOne({ email })
    signedUser.isAdmin = false
    await signedUser.save()
    res.status(200).json({ message: 'User has quite being an admin' })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error, try again.' })
  }
}
