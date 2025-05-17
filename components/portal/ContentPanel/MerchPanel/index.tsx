import Add from '@mui/icons-material/Add'
import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import { useMerch } from '../../../../lib/useMerch'
import { MerchTable } from './MerchTable'

export default function MerchPanel () {
  const { data: merch, isLoading, } = useMerch()
  const { push, pathname } = useRouter()

  if (isLoading) {
    return (
      <></>
    )
  }

  return (
    <>
      <Button
        startIcon={<Add/>}
        variant='contained'
        onClick={() => push(`${pathname}/create-merch`)}
        sx={{
          mb: "1rem"
      }}
      >
        Přidat merch
      </Button>
      {merch && merch.length > 0 && <MerchTable merch={merch}/>}
    </>
  )
}