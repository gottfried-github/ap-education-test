import { Router } from 'express'
import createMiddleware from '../../middleware/groups/create'
import createController from '../../controllers/groups/create'
import getActiveController from '../../controllers/groups/getActive'
import addStudentMiddleware from '../../middleware/groups/addStudent'
import addStudentController from '../../controllers/groups/addStudent'
import getManyController from '../../controllers/groups/getMany'
import getByIdMiddleware from '../../middleware/groups/getById'
import getByIdController from '../../controllers/groups/getById'

const groupsRouter = Router()

groupsRouter.post('/', createMiddleware, createController)
groupsRouter.get('/active', getActiveController)
groupsRouter.post('/:groupId/student', addStudentMiddleware, addStudentController)
groupsRouter.get('/', getManyController)
groupsRouter.get('/:id', getByIdMiddleware, getByIdController)

export default groupsRouter
