import prisma from '../../db'
import { isPrismaError, AppError } from '../../common'

const getMany = async () => {
  try {
    const groups = await prisma.group.findMany({
      orderBy: {
        created_at: 'desc',
      },
    })

    return groups
  } catch (e) {
    if (isPrismaError(e)) {
      throw new AppError(500, e.message, e)
    } else {
      throw new AppError(500, 'something went wrong', e)
    }
  }
}

export default getMany
