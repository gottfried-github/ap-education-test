import { z } from 'zod'
import _validate, { type ValidatedRequest } from 'express-zod-safe'

const CreateStudentSchema = z.object({
  name: z.string().min(3).max(10000),
  email: z.email(),
})

const validate = _validate({ body: CreateStudentSchema })

// https://github.com/AngaBlue/express-zod-safe/tree/main?tab=readme-ov-file#-using-validatedrequest
export type CreateStudentRequest = ValidatedRequest<{ body: typeof CreateStudentSchema }>

export default [validate]
