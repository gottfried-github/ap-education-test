import { z } from 'zod'
import _validate, { type ValidatedRequest } from 'express-zod-safe'

const CreateGroupSchema = z.object({
  name: z.string().min(3).max(10000),
  start_date: z.iso.datetime(),
})

const validate = _validate({ body: CreateGroupSchema })

// https://github.com/AngaBlue/express-zod-safe/tree/main?tab=readme-ov-file#-using-validatedrequest
export type CreateGroupRequest = ValidatedRequest<{ body: typeof CreateGroupSchema }>

export default [validate]
