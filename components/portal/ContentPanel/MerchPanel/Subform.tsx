import { useSubcategoriesQuery } from '@/api/hooks/merch/useSubcategoriesQuery'
import { Tables } from '@/types/database.types'
import { useQueries} from '@tanstack/react-query'

export function Subform ({category}: {category: 'APPAREL' | 'ACCESSORIES' }) {

  const queries = useSubcategoriesQuery(category)
  // console.log(queries)
  return (
    <>
      <h1>{category}</h1>
    </>
  )
}