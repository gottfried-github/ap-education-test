import { cache } from '../../common/cache'

const getCourses = async () => {
  const res = await fetch('https://fakestoreapi.com/products')

  const resBody: { id: number; title: string; price: number }[] = await res.json()

  return resBody.map(item => ({
    id: item.id,
    title: item.title,
    price: item.price,
  }))
}

const courses = async () => {
  const courses = await cache('courses', getCourses)

  return courses
}

export default courses
