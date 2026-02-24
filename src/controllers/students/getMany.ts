import type { Request, Response } from 'express'
import getManyService from '../../services/students/getMany'

const getMany = async (req: Request, res: Response) => {
  const students = await getManyService()

  res.json({
    message: "here's your students",
    data: students,
  })
}

export default getMany
