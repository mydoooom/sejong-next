import { useSizesQuery } from '@/api/hooks/merch/useSizesQuery'

export function SizesForm () {

  const { data: sizes } = useSizesQuery()

  console.log(sizes)
  return (
    <>

    </>
  )
}