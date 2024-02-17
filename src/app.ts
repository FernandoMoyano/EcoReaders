import dotenv from 'dotenv'
dotenv.config()

//Express
import express, { Application } from 'express'
//Routes
import apiRouter from './routes/index'

//Middlewares
import { handleError } from './middlewares/handleError'
import { loggError1 } from './middlewares/loggError1'

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
    this.app.use(loggError1)
    this.app.use(handleError)

    this.app.use('/api', apiRouter)
  }
}
