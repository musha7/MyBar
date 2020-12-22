import express from 'express'
import { getUsers, login } from '../controllers/userController.js'

const router = express.Router();

router.route('/').get(getUsers)
router.route('/login').post(login)

export default router