import AuthCheck from '@/components/portal/AuthCheck'
import { MerchForm } from '@/components/portal/ContentPanel/MerchPanel/MerchForm'

export default function CreateMerch() {
  return (
    <AuthCheck>
      <MerchForm/>
    </AuthCheck>
  )
}