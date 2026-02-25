import { Router } from 'express'
import timeout from 'connect-timeout'
import coursesController from '../../controllers/external/courses'

const externalRouter = Router()

externalRouter.get('/courses', timeout(1000 * 3), coursesController)

export default externalRouter
