//Import de dotenv
import dotenv from 'dotenv'
dotenv.config()
//Express
import express, { Application } from 'express'
//import cors
import cors from 'cors'
//Import routes
import apiRouter from './routes/index'
//Import Swagger
import swaggerUi from 'swagger-ui-express'
//Importación de archivo swagger
import swaggerDocumentation from '../openapi.json'
//Importacion Middlewares
import { handleError } from './middlewares/handleError'
import { loggError } from './middlewares/loggError'

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
    this.app.use(express.urlencoded({ extended: false }))
    this.app.use(express.json())
    this.app.use(loggError)
    this.app.use(handleError)
    this.app.use(
      cors({
        origin: 'http://localhost:5173',
        credentials: true,
      }),
    )
    this.app.use('/api', apiRouter)
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocumentation))
  }
}
