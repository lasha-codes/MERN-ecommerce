import express from 'express'
const router = express.Router()
import {
  registerController,
  getProfileController,
  uploadProductAdmin,
} from '../controllers/userController.js'

router.post('/register', registerController)
router.get('/account', getProfileController)
router.post('/product-admin', uploadProductAdmin)

export default router
