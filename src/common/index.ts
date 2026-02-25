import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
} from '../../generated/prisma/internal/prismaNamespace'
import { createClient, type RedisJSON } from 'redis'

export class AppError extends Error {
  public status?: number
  public data?: unknown

  constructor(status?: number, message?: string, data?: unknown, options?: ErrorOptions) {
    super(message, options)

    if (status) this.status = status
    if (data) this.data = data
  }
}

// https://www.prisma.io/docs/orm/reference/error-reference
// there's no common superclass
export const isPrismaError = (e: unknown) => {
  return (
    e instanceof PrismaClientKnownRequestError ||
    e instanceof PrismaClientUnknownRequestError ||
    e instanceof PrismaClientRustPanicError ||
    e instanceof PrismaClientInitializationError ||
    e instanceof PrismaClientValidationError
  )
}

const client = createClient({
  url: 'redis://redis:6379',
})

client.connect()

export const cache = async (key: string, getData: () => Promise<RedisJSON>) => {
  const dataCached = await client.json.get(key)

  if (dataCached) {
    console.log(`cache hit for key ${key}`)
    return dataCached
  }

  console.log(`cache miss for key ${key}, fetching data`)

  try {
    const data = await getData()

    await client.json.set(key, '$', data)
    await client.expire(key, 5)

    return data
  } catch (e) {
    throw new AppError(
      500,
      'cache: something went wrong while fetching data and writing it to cache',
      e
    )
  }
}
