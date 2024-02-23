import express, { Router } from 'express'
import { bookRoutes } from './books.routes'
import { authRoutes } from './auth.routes'

const router: Router = express.Router()

router.use('/auth', authRoutes)
router.use('/books', bookRoutes)
/* router.use('/users', userRoutes) */

export default router
