import 'dotenv/config'
import './database'
import { app } from './app'

const port = process.env.PORT || 3333

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`🚀 Server started go to http://localhost:${port}`)
    )
  } catch (error) {
    app.log.error(error)
    process.exit(1)
  }
}

start()
