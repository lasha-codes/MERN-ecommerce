import express from 'express'
const router = express.Router()
import {
  registerController,
  getProfileController,
} from '../controllers/userController.js'

router.post('/register', registerController)
router.get('/account', getProfileController)

export default router
