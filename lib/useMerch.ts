import { useQuery } from '@tanstack/react-query'
import { supabase } from '../supabase'
import { Tables } from '../types/database.types'

// Define the type for the joined data structure
type MerchWithCategories = Tables<'merch'> & {
  merch_categories: Pick<Tables<'merch_categories'>, 'name'>
}

const fetchMerch = async (): Promise<MerchWithCategories[]> => {
  // Use the query builder instead of raw SQL strings
  const { data, error } = await supabase
    .from('merch')
    .select('*, merch_categories(name)')

  if (error) throw error

  return data as MerchWithCategories[]
}

export const useMerch = () => useQuery<MerchWithCategories[], Error>({
  queryKey: ['merch'],
  queryFn: fetchMerch,
})

// Export the type directly
export type Merch = MerchWithCategories