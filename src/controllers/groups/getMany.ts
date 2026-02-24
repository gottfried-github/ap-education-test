import type { Request, Response } from 'express'
import getManyService from '../../services/groups/getMany'

const getMany = async (req: Request, res: Response) => {
  const groups = await getManyService()

  res.json({
    message: "here's your groups",
    data: groups,
  })
}

export default getMany
