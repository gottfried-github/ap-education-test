import type { Response } from 'express'
import createService from '../../services/students/create'
import type { CreateStudentRequest } from '../../middleware/students/create'

const create = async (req: CreateStudentRequest, res: Response) => {
  const createRes = await createService(req.body)

  res.json({
    message: 'successfully created the student',
    data: createRes,
  })
}

export default create
