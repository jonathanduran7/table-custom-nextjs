import { data } from "../data/data"

export const fakeSortService = (keyColumn: string, order: 'asc' | 'desc'): Promise<unknown> => {
  console.log('calling fake sort api', { keyColumn, order })
  return new Promise((resolve) => {
    setTimeout(() => {
      if (order === 'desc') data.reverse()
      resolve(data)
    }, 1000)
  })
}
