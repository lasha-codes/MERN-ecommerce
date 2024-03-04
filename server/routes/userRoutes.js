import express from 'express'
const router = express.Router()
import {
  registerController,
  getProfileController,
  uploadProductAdmin,
  getAllArrivals,
} from '../controllers/userController.js'

router.get('/get-arrivals', getAllArrivals)
router.get('/account', getProfileController)
router.post('/register', registerController)
router.post('/product-admin', uploadProductAdmin)

export default router
