import { useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../supabase'
import { Tables } from '../types/database.types'

export type MerchMutation =  Omit<Tables<'merch'>, 'id' | 'created_at'>

const insertMerch = async (newMerch: MerchMutation) => {
  const { data, error } = await supabase
    .from('merch')
    .insert(newMerch)
    .select('*')
    .single()

  if (error) {

    throw error
  }
  return data
}

export const useMerchMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: insertMerch,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['merch'] })
    },
  })
}