import { useQuery } from '@tanstack/react-query'
import { supabase } from '../supabase'
import { Tables } from '../types/database.types'

export type MerchCategory = Tables<'merch_categories'>

const fetchMerchCategories = async (): Promise<MerchCategory[]> => {
  const { data, error } = await supabase
    .from('merch_categories')
    .select('*')

  if (error) throw error

  return data as MerchCategory[]
}

export const useMerchCategories = () => useQuery<MerchCategory[], Error>({
  queryKey: ['categories'],
  queryFn: fetchMerchCategories,
})