import type { Request, Response } from 'express'
import coursesService from '../../services/external/courses'

const courses = async (req: Request, res: Response) => {
  const courses = await coursesService()

  res.json({
    message: "here's your courses",
    data: courses,
  })
}

export default courses
