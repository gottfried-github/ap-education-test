import type { Response } from 'express'
import { type AddStudentRequest } from '../../middleware/groups/addStudent'
import addStudentService from '../../services/groups/addStudent'

const addStudent = async (req: AddStudentRequest, res: Response) => {
  const addStudentRes = await addStudentService(req.params.groupId, req.body.studentId)

  res.json({
    message: 'added the student to the group',
    data: addStudentRes,
  })
}

export default addStudent
