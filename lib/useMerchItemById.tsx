import { useQuery } from '@tanstack/react-query'
import { supabase } from '../supabase'
import { Tables } from '../types/database.types'

export type Merch = Tables<'merch'>

const fetchMerchItemById = async (id: string) => {
  // Use the query builder instead of raw SQL strings
  const { data, error } = await supabase
    .from('merch')
    .select()
    .eq('id', id)
    .single()

  if (error) throw error

  return data
}

export const useMerchItemById = (id: string | null | undefined) => useQuery({
  queryKey: ['merch', id],
  queryFn: () => {
    if (!id) throw new Error('ID is required')
    return fetchMerchItemById(id)
  },
  enabled: !!id,
})