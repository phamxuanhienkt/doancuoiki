import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import 'reflect-metadata'
import { connection } from './database/connection'
import { router } from './routes'

async function main() {
  const port = process.env.PORT || 3001
  const app = express()
  app.use(cors())

  await connection()

  app.use('/api', router)

  app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`)
  })
}

main()