import type { Request, Response } from 'express'
import { type CreateGroupRequest } from '../../middleware/groups/create'
import createService from '../../services/groups/create'

const create = async (req: CreateGroupRequest, res: Response) => {
  const createRes = await createService(req.body)

  res.json({
    message: 'successfully created the group',
    data: createRes,
  })
}

export default create
