import { useQuery } from '@tanstack/react-query'
import { supabase } from '../utils/supabase'

const fetchMerch = async () => {
  const { data, error } = await supabase.from('merch').select(`
    *,
    merch_categories (
      name
    )
  `)
  if (error) throw error

  return data
}

export const useMerch = () => useQuery({
  queryKey: ['merch'],
  queryFn: fetchMerch,
})