import { supabase } from '@/supabase'
import { Tables } from '@/types/database.types'
import { useQuery } from '@tanstack/react-query'

export type Color = Tables<'colors'>

const fetchColors = async () => {
  const { data, error } = await supabase.from('colors').select(`*`)

  if (error) throw error

  return data as Color[]
}
export const useColorsQuery = () => useQuery<Color[], Error>({
  queryKey: ['colors'],
  queryFn: fetchColors,
})