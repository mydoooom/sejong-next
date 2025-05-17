import { useQuery } from '@tanstack/react-query'
import { supabase } from '../supabase'
import { Tables } from '../types/database.types'

export type Category = Tables<'merch_categories'>

const fetchMerchCategories = async (): Promise<Category[]> => {
  const { data, error } = await supabase
    .from('merch_categories')
    .select('*')

  if (error) throw error

  return data as Category[]
}

export const useCategories = () => useQuery<Category[], Error>({
  queryKey: ['categories'],
  queryFn: fetchMerchCategories,
})