import prisma from '../../db'
import { isPrismaError, AppError } from '../../common'

const getById = async (id: number) => {
  let group = null

  try {
    group = await prisma.group.findFirst({
      where: {
        id,
      },
    })
  } catch (e) {
    if (isPrismaError(e)) {
      throw new AppError(500, e.message, e)
    } else {
      throw new AppError(500, 'something went wrong', e)
    }
  }

  if (!group) throw new AppError(404, "group with given id doesn't exist")

  return group
}

export default getById
