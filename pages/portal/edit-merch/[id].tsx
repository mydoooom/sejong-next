import { useRouter } from 'next/router'
import { MerchForm } from '../../../components/portal/ContentPanel/MerchPanel/MerchForm'
import { useMerchItem } from '../../../api/hooks/merch/useMerchItem'

export default function EditMerch() {
  const router = useRouter()
  const { data, error, isError, isLoading } = useMerchItem(router.query.id as string | undefined)

  if (!router.isReady || isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Error: {error.message}</p>
  }

  if (!data) {
    return <p>item not found</p>
  }

  return (
      <MerchForm editMode merch={data}/>
  )
}