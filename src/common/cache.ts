import { createClient, type RedisJSON } from 'redis'
import { AppError } from '.'

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
      503,
      'cache: something went wrong while fetching data and writing it to cache',
      e
    )
  }
}
