import type { Request, Response } from 'express'
import getActiveService from '../../services/groups/getActive'

const studentThreshold = parseInt(process.env.ACTIVE_GROUP_STUDENT_THRESHOLD || '3', 10)

const getActive = async (req: Request, res: Response) => {
  const groups = await getActiveService(studentThreshold)

  res.json({
    message: 'here are your active groups',
    data: groups,
  })
}

export default getActive
