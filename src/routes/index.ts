import express, { Router } from 'express'
import { bookRoutes } from './books.routes'
import { userRoutes } from './users.routes'
import { authRoutes } from './auth.routes'

const router: Router = express.Router()

router.use('/books', bookRoutes)
router.use('/users', userRoutes)
router.use('/auth', authRoutes)

export default router
