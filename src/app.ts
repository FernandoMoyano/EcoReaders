import dotenv from 'dotenv'
dotenv.config()

import express, { Application } from 'express'
import apiRouter from './routes/index'
import { handleError } from './middlewares/handleError'
import { loggError } from './middlewares/logError'

//Clase App -----------------------------------------
export class App {
  private app: Application

  constructor(private port?: number | string) {
    this.app = express()
    this.setting()
    this.middlewares()
  }

  setting() {
    this.app.set('port', this.port || process.env.PORT || 3000)
  }

  startServer() {
    const server = this.app.listen(this.app.get('port'), () => {
      console.log('Server on port', this.app.get('port'))
    })
    server.on('error', (error: NodeJS.ErrnoException) => {
      console.log('Error al inicial el servidor', error.message)
    })
  }

  middlewares() {
    this.app.use(express.json())
    this.app.use(handleError)
    this.app.use(loggError)
    this.app.use('/api', apiRouter)
  }
}
