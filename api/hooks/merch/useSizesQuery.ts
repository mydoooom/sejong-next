import { supabase } from '@/supabase'
import { Tables } from '@/types/database.types'
import { useQuery } from '@tanstack/react-query'

export type Size = Tables<'sizes'>

const fetchSizes = async () => {
  const { data, error } = await supabase.from('sizes').select(`*`)

  if (error) throw error

  return data as Size[]
}
export const useSizesQuery = () => useQuery<Size[], Error>({
  queryKey: ['sizes'],
  queryFn: fetchSizes,
})