import express, { Router } from 'express'
import { bookRoutes } from './books.routes'
import { userRouter } from './users.routes'

const router: Router = express.Router()

router.use('/books', bookRoutes)
router.use('/users', userRouter)

export default router
