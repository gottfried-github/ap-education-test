import { Router } from 'express'
import createMiddleware from '../../middleware/students/create'
import createController from '../../controllers/students/create'
import getManyController from '../../controllers/students/getMany'

const studentsRouter = Router()

studentsRouter.post('/', createMiddleware, createController)
studentsRouter.get('/', getManyController)

export default studentsRouter
