import type { Response } from 'express'
import { type GetGroupByIdRequest } from '../../middleware/groups/getById'
import getByIdService from '../../services/groups/getById'

const getById = async (req: GetGroupByIdRequest, res: Response) => {
  const group = await getByIdService(req.params.id)

  res.json({
    message: "here's your group",
    data: group,
  })
}

export default getById
