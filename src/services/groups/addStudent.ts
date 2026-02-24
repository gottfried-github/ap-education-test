import prisma from '../../db'
import { AppError, isPrismaError } from '../../common'
import { PrismaClientKnownRequestError } from '../../../generated/prisma/internal/prismaNamespace'

const addStudent = async (groupId: number, studentId: number) => {
  console.log('addStudent')

  try {
    const res = await prisma.groupsStudents.create({
      data: {
        group_id: groupId,
        student_id: studentId,
      },
    })

    return res
  } catch (e) {
    if (isPrismaError(e)) {
      // Unique constraint failed
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002') {
        throw new AppError(409, 'the student is already in the group', e)
        // Foreign key constraint violation (for instance, happens when the primary key for the foreign key value doesn't exist)
      } else if (e instanceof PrismaClientKnownRequestError && e.code === 'P2003') {
        throw new AppError(404, "either the student or the group or both don't exist", e)
      } else {
        throw new AppError(500, e.message, e)
      }
    } else {
      throw new AppError(500, 'something went wrong', e)
    }
  }
}

export default addStudent
