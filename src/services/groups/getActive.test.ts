jest.mock('../../db', () => {
  return {
    $queryRaw: jest.fn(),
  }
})

import prisma from '../../db'
import getActive from './getActive'

describe('getActive', () => {
  test('calls prisma.$queryRaw', async () => {
    await getActive(3)
    expect(prisma.$queryRaw).toHaveBeenCalled()
  })
})
