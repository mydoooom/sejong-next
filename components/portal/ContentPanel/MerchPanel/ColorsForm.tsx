import { useColorsQuery } from '@/api/hooks/merch/useColorsQuery'

export function ColorsForm () {

  const { data: colors } = useColorsQuery()

  console.log(colors)
  return (
    <>

    </>
  )
}