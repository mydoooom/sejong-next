import { addDoc, collection } from '@firebase/firestore'
import { db } from '../../lib/firebase'
import { Save, Publish, DeleteOutline } from '@mui/icons-material'
import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import TipTapEditor from './TipTapEditor'
import slugify from 'slugify'

export type ArticleFormInputs = {
  title: string
  content: string
}

interface Props {
  editMode?: boolean
}

export default function ArticleForm ({ editMode }: Props) {
  const methods = useForm<ArticleFormInputs>({
    defaultValues: {
      title: "",
      content: ""
    },
    mode: 'onBlur'
  })

  const onSubmit: SubmitHandler<ArticleFormInputs>
    = async (data) => {
    try {
      await addDoc(collection(db, 'news'), {
        ...data,
        slug: slugify(data.title),
        timestamp: Date.now()
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container sx={{ my: '2rem' }}>
      <Paper elevation={2}>
        <Box
          component='form'
          onSubmit={methods.handleSubmit(onSubmit)}
          sx={{
            p: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}
        >
          <Typography variant='h2' fontWeight='bold'>{editMode ? 'Upravit článek' : 'Nový článek'}</Typography>
          <TextField
            type='text'
            color='info'
            label='Titulek'
            {...methods.register('title', {
              required: 'Vyplňte titulek'
            })}
          />
          <FormProvider {...methods}>
            <TipTapEditor isDirty={methods.formState.isDirty}/>
          </FormProvider>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap-reverse' }}>
              <Button
                startIcon={<DeleteOutline/>}
                variant='outlined'
                color='warning'
                onClick={() => methods.reset()}
              >
                Zahodit
              </Button>
            <Box sx={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
              <Button
              startIcon={<Save/>}
              variant='outlined'
              // onClick={() => push(`${pathname}/create-article`)}
            >
              Uložit
            </Button>
              <Button
                startIcon={<Publish/>}
                variant='contained'

              >
                Publikovat
              </Button>
            </Box>
          </Box>

        </Box>
      </Paper>
    </Container>
  )
}
