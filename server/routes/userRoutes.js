import express from 'express'
const router = express.Router()
import {
  registerController,
  getProfileController,
  uploadProductAdmin,
  logoutUser,
  loginController,
  userPhotoUpload,
  addToUserCart,
  decrementProductCount,
  deleteFromTheCart,
  incrementProductCart,
} from '../controllers/userController.js'

router.get('/account', getProfileController)
router.post('/register', registerController)
router.post('/login', loginController)
router.post('/product-admin', uploadProductAdmin)
router.post('/logout', logoutUser)
router.post('/upload-image', userPhotoUpload)
router.post('/add-to-cart', addToUserCart)
router.put('/decrement-product-count', decrementProductCount)
router.put('/delete-product', deleteFromTheCart)
router.put('/increment-count', incrementProductCart)

export default router
