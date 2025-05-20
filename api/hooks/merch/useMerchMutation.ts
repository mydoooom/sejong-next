import { useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/supabase'
import { Tables } from '@/types/database.types'
import { useRouter } from 'next/router'

export type MerchInsert =  Omit<Tables<'merch'>, 'id' | 'created_at'>
export type MerchUpdate = Omit<Tables<'merch'>, 'created_at'>

type MutateMerch = MerchInsert | MerchUpdate
const mutateMerch = async (data: MutateMerch) => {
  if ('id' in data) {
    const { data: result, error } = await supabase
      .from('merch')
      .update(data)
      .eq('id', data.id)
      .select('*')
      .single()

    if (error) {
      throw error
    }

    return result

  } else {
    // Insert new row
    const { data: result, error } = await supabase
      .from('merch')
      .insert(data)
      .select('*')
      .single()

    if (error) {
      throw error
    }

    return result
  }

}

export const useMerchMutation = () => {
  const queryClient = useQueryClient()
  const { push } = useRouter()

  return useMutation({
    mutationFn: mutateMerch,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['merch'] })
      void push('/portal')
    },
  })
}