import { App } from './app'

function main() {
  const app = new App()
  app.startServer()
  app.middlewares()
}
main()
