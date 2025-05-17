import { Box, Container, Paper, TextField } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { MerchMutation, useMerchMutation } from '../../../../lib/useMerchMutation'

export function MerchForm () {

  const { control, handleSubmit } = useForm<MerchMutation>({
    defaultValues: {
      name: '',
      description: '',
      image_url: '',
      archived: false,
      category_id: ''
    }
  })
  const { mutate, isPending, isError, error } = useMerchMutation()


  const onSubmit = (data: MerchMutation) => {
    mutate(data)
  }

  return (
    <>
      <Container sx={{ my: '2rem' }}>
        <Paper elevation={0} variant='outlined' sx={{ maxWidth: '50rem' }}>
          <Box
            component='form'
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name='name'
              control={control}
              render={({ field }) => (
                <TextField {...field} label='Název'/>
              )}
            />
          </Box>
        </Paper>
      </Container>

    </>
  )
}