import { useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/supabase'
import { useRouter } from 'next/router'

const deleteMerch = async (id: string) => {
    const { data: result, error } = await supabase
      .from('merch')
      .delete()
      .eq('id', id)
      .select('*')
      .single()

    if (error) {
      throw error
    }

    return result

}

export const useDeleteMerchItem = () => {
  const queryClient = useQueryClient()
  const { push } = useRouter()

  return useMutation({
    mutationFn: deleteMerch,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['merch']})
    },
  })
}