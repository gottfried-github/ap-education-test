import prisma from '../../db'
import { AppError, isPrismaError } from '../../common'
import { type Group } from '../../../generated/prisma/client'

type GroupActive = Group & { student_count: number }

const getActive = async (studentTreshold: number) => {
  try {
    const activeGroups = await prisma.$queryRaw<GroupActive[]>`
      SELECT
	    "Group".id,
	    "Group".name,
	    COUNT("GroupsStudents".student_id)::INT AS student_count,
	    "Group".start_date,
	    "Group".created_at
      FROM "GroupsStudents"
      JOIN "Group" ON "Group".id = "GroupsStudents".group_id
      WHERE "Group".start_date <= NOW()
      GROUP BY "Group".id
      HAVING COUNT("GroupsStudents".student_id) >= ${studentTreshold}
      ORDER BY "Group".created_at DESC
    `

    return activeGroups
  } catch (e) {
    if (isPrismaError(e)) {
      throw new AppError(500, e.message, e)
    } else {
      throw new AppError(500, 'something went wrong', e)
    }
  }
}

export default getActive
