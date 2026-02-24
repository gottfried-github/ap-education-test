import { z } from 'zod'
import _validate, { type ValidatedRequest } from 'express-zod-safe'

const GetGroupByIdParamsSchema = z.object({
  id: z.coerce.number<string>(),
})

const validate = _validate({ params: GetGroupByIdParamsSchema })

export type GetGroupByIdRequest = ValidatedRequest<{ params: typeof GetGroupByIdParamsSchema }>

export default [validate]
