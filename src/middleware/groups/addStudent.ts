import { z } from 'zod'
import _validate, { type ValidatedRequest } from 'express-zod-safe'

const AddStudentBodySchema = z.object({
  studentId: z.number().min(0),
})

const AddStudentParamsSchema = z.object({
  groupId: z.coerce.number<string>(),
})

const validate = _validate({ body: AddStudentBodySchema, params: AddStudentParamsSchema })

// https://github.com/AngaBlue/express-zod-safe/tree/main?tab=readme-ov-file#-using-validatedrequest
export type AddStudentRequest = ValidatedRequest<{
  body: typeof AddStudentBodySchema
  params: typeof AddStudentParamsSchema
}>

export default [validate]
