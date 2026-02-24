import prisma from '../../db'
import { isPrismaError, AppError } from '../../common'
import type { CreateStudentRequest } from '../../middleware/students/create'

const create = async (data: CreateStudentRequest['body']) => {
  try {
    const createRes = await prisma.student.create({
      data: {
        ...data,
        created_at: new Date(),
      },
    })

    return createRes
  } catch (e) {
    if (isPrismaError(e)) {
      throw new AppError(500, e.message, e)
    } else {
      throw new AppError(500, 'something went wrong', e)
    }
  }
}

export default create
