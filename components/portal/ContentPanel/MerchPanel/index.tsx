import { useMerch } from '../../../../lib/useMerch'

export default function MerchPanel() {
  const { data: merch, isLoading } = useMerch()

  return (
    <>
      {merch && merch.map(({id, name, image_url}) => (
        <h1 key={id}>{name}</h1>
      ))}
    </>
  )
}