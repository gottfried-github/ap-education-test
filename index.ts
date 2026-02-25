import express from 'express'
import cors from 'cors'
import { setGlobalOptions } from 'express-zod-safe'
import { globalErrorHandler, zodDefaultErrorHandler } from './src/middleware/common'
import groupsRouter from './src/routers/groups'
import studentsRouter from './src/routers/students'
import externalRouter from './src/routers/external'

const main = async () => {
  const app = express()

  setGlobalOptions({ handler: zodDefaultErrorHandler })

  app.use(express.json())
  app.use(
    cors({
      origin: true,
    })
  )
  app.use('/groups', groupsRouter)
  app.use('/students', studentsRouter)
  app.use('/external', externalRouter)
  app.use(globalErrorHandler)

  app.listen(3000, () => {
    console.log('listening on port 3000')
  })
}

main()
