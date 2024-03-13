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
      const productCounts = []
      const products = []
      loggerUser.cart.forEach((product) => {
        productCounts.push(product.productCount)
      })
      loggerUser.cart.forEach((product) => {
        products.push(product)
      })

      let finalCartLength = 0
      let totalPrice = 0

      for (const count of productCounts) {
        finalCartLength += count
      }

      for (const product of products) {
        totalPrice += product.productPrice * product.productCount
      }

      const allProducts = await AdminModel.find({}).sort({ createdAt: -1 })

      if (loggerUser) {
        res.status(200).json({
          username: loggerUser.username,
          email: loggerUser.email,
          gender: loggerUser.gender,
          avatar: loggerUser.avatar ? loggerUser.avatar : '',
          cart: loggerUser.cart,
          totalPrice: totalPrice,
          cartLength: finalCartLength,
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
}

export const userPhotoUpload = (req, res) => {
  const { token } = req.cookies
  const { base64 } = req.body

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
}

export const addToUserCart = async (req, res) => {
  const { token } = req.cookies
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized request' })
  }
  const {
    productTitle,
    productImage,
    productType,
    productColor,
    productPrice,
  } = req.body
  const { email } = jwt.verify(token, process.env.JWT_SECRET)
  const userCartToUpdate = await UserModel.findOne({ email })
  const alreadyInCart = userCartToUpdate.cart.find((product) => {
    return product?.productTitle === productTitle
  })

  if (alreadyInCart) {
    alreadyInCart.productCount += 1
    await userCartToUpdate.save()
    res.status(200).json({ message: 'Product count incremented' })
  } else {
    userCartToUpdate.cart.push({
      productTitle: productTitle,
      productColor: productColor,
      productPrice: productPrice,
      productImage: productImage,
      productType: productType,
      productCount: 1,
    })
    await userCartToUpdate.save()
    res.status(200).json({ message: 'Successfully added product to the cart' })
  }
}

export const decrementProductCount = (req, res) => {
  const { token } = req.cookies
  const { productId } = req.body
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized request' })
  }
  try {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
      const { email } = info
      const loggerUser = await UserModel.findOne({ email })
      const productToUpdate = loggerUser.cart.find((product) => {
        return product._id.toString() === productId.toString()
      })
      if (!productToUpdate) return
      if (productToUpdate.productCount === 1) {
        const filteredCart = loggerUser.cart.filter((product) => {
          return product._id.toString() !== productId.toString()
        })
        loggerUser.cart = filteredCart
        await loggerUser.save()
        res.status(200).json({ message: 'Successfully removed from the cart' })
        return
      }
      productToUpdate.productCount -= 1
      await loggerUser.save()
      res
        .status(200)
        .json({ message: 'Successfully decremented item from the cart' })
    })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const deleteFromTheCart = async (req, res) => {
  const { token } = req.cookies
  const { productId } = req.body
  try {
    if (!token) return res.status(401).json({ message: 'Unauthorized request' })
    const { email } = jwt.verify(token, process.env.JWT_SECRET)
    const loggerUser = await UserModel.findOne({ email })
    if (!loggerUser)
      return res.status(500).json({ message: 'How tf did this even happen' })

    const updatedCart = loggerUser.cart.filter((products) => {
      return productId.toString() !== products._id?.toString()
    })

    loggerUser.cart = updatedCart
    await loggerUser.save()
    res
      .status(200)
      .json({ message: 'successfully removed product from the cart' })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const incrementProductCart = async (req, res) => {
  const { token } = req.cookies
  const { productTitle } = req.body
  try {
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized request' })
    }

    const { email } = jwt.verify(token, process.env.JWT_SECRET)
    const loggerUser = await UserModel.findOne({ email })
    const productToIncrement = loggerUser.cart.find((product) => {
      return product.productTitle.toString() === productTitle.toString()
    })

    if (productToIncrement) {
      productToIncrement.productCount += 1
    }

    await loggerUser.save()
    res.status(200).json({ message: 'Successfully incremented product' })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error try again.' })
  }
}
