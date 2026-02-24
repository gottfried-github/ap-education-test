import prisma from '../../db'
import { isPrismaError, AppError } from '../../common'
import type { CreateGroupRequest } from '../../middleware/groups/create'

const create = async (data: CreateGroupRequest['body']) => {
  try {
    const createRes = await prisma.group.create({
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
