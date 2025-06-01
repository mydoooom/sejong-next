import { Color } from '@/api/hooks/merch/useColorsQuery'
import { Size } from '@/api/hooks/merch/useSizesQuery'
import { supabase } from '@/supabase'
import { useQueries } from '@tanstack/react-query'

const fetchSizes = async () => {
  const { data, error } = await supabase.from('sizes').select(`*`)

  if (error) throw error

  return data as Size[]
}

const fetchColors = async () => {
  const { data, error } = await supabase.from('colors').select(`*`)

  if (error) throw error

  return data as Color[]
}

export const useSubcategoriesQuery = (category: 'APPAREL' | 'ACCESSORIES') => {
  const getQueriesForCategory = (category: 'APPAREL' | 'ACCESSORIES') => {
    const queries = []

    switch (category) {
      case 'APPAREL':
        queries.push(
          { queryKey: ['colors'], queryFn: fetchColors },
          { queryKey: ['sizes'], queryFn: fetchSizes }
        )
        break

      case 'ACCESSORIES':
        queries.push(
          { queryKey: ['colors'], queryFn: fetchColors }
        )
        break
    }

    return queries
  }

  return useQueries({
    queries: getQueriesForCategory(category)
  })
}