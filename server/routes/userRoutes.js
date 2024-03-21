import express from 'express'
const router = express.Router()
import {
  registerController,
  getProfileController,
  uploadProductAdmin,
  logoutUser,
  loginController,
  userPhotoUpload,
  becomeAdmin,
  quitBeingAdmin,
  addComment,
  updateUserInfo,
} from '../controllers/userController.js'

router.get('/account', getProfileController)
router.post('/register', registerController)
router.post('/login', loginController)
router.post('/product-admin', uploadProductAdmin)
router.post('/logout', logoutUser)
router.post('/upload-image', userPhotoUpload)
router.post('/become-admin', becomeAdmin)
router.post('/quit-admin', quitBeingAdmin)
router.post('/add-comment', addComment)
router.put('/update-user', updateUserInfo)

export default router
