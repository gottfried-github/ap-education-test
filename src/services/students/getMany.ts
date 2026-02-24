import prisma from '../../db'
import { isPrismaError, AppError } from '../../common'

const getMany = async () => {
  try {
    const students = await prisma.student.findMany({
      orderBy: {
        created_at: 'desc',
      },
    })

    return students
  } catch (e) {
    if (isPrismaError(e)) {
      throw new AppError(500, e.message, e)
    } else {
      throw new AppError(500, 'something went wrong', e)
    }
  }
}

export default getMany
