import express, { Router } from 'express'
import { bookRoutes } from './books.routes'

const router: Router = express.Router()

router.use('/books', bookRoutes)

export default router
