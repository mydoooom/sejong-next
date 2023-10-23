import { addDoc, updateDoc, collection, arrayUnion } from '@firebase/firestore'
import { deleteDoc, doc, DocumentData } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { NewsContext } from '../../../lib/context'
import { db } from '../../../lib/firebase'
import Replay from '@mui/icons-material/Replay'
import Save from '@mui/icons-material/Save'
import Cancel from '@mui/icons-material/Cancel'
import DeleteOutline from '@mui/icons-material/DeleteOutline'
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel, IconButton,
  Paper,
  Snackbar,
  TextField,
  Typography, useMediaQuery
} from '@mui/material'
import { theme } from '../../../styles/mui-theme'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import TipTapEditor from './TipTapEditor'
import slugify from 'slugify'

type AlertMessage = {
  type: 'success' | 'error'
  message: string
}

export type ArticleFormInputs = {
  title: string
  content: string
  isPublished: boolean
}

export const handleDelete = async (id: string) => {
  if (confirm("Opravdu chcete smazat tento článek?")) {
    await deleteDoc(doc(db, "news", id))
  }
}

interface Props {
  articleData?: DocumentData | null
  editMode?: boolean
}

export default function ArticleForm ({ articleData, editMode }: Props) {
  const [articlesSnapshot] = useContext(NewsContext)
  const { push, events } = useRouter()
  const [open, setOpen] = useState(false)
  const lessThanSm = useMediaQuery(theme.breakpoints.down('sm'))
  const [alertMessage, setAlertMessage] = useState<AlertMessage>({
    type: 'success',
    message: ''
  })
  const articleForm = useForm<ArticleFormInputs>({
    defaultValues: (editMode && articleData) ? {
      title: articleData.title,
      content: articleData.content,
      isPublished: articleData.isPublished
    } : {
      title: "",
      content: "<p></p>",
      isPublished: false
    },
    mode: 'onBlur'
  })

  const handleCancel = useCallback(() => {
    if (articleForm.formState.isSubmitted) {
      return true
    }

    if (articleForm.formState.isDirty) {
      if (confirm('Máte neuložené změny, opravdu chcete opustit článek?')) {
        articleForm.reset()
        return true
      }
      // TODO when using back/forward buttons, the url changes, needs further investigation
      throw "Abort route change by user's confirmation."
    }
    return null
  }, [articleForm])

  useEffect(() => {
    if (articleForm.formState.isSubmitted) {
      setTimeout(() => {
        void push('/portal')
      }, 1000)
    }
  }, [articleForm.formState.isSubmitted, push])

  useEffect(() => {
    events.on('routeChangeStart', handleCancel)

    return () => {
      events.off('routeChangeStart', handleCancel)
    }
  }, [handleCancel, events])

  const handleClose = (_event: React.SyntheticEvent | Event) => {
    setOpen(false);
  }

  const handleReset = () => {
    if (confirm(
      editMode
        ? 'Nyní se článek uvede do původního stavu. Pokračovat?'
        : 'Opravdu chcete vymazat celý obsah článku a začít znovu?'
    )) {articleForm.reset()}

    return
  }

  const createUniqueSlug = (newSlug: string, articleSlugs: string[]) => {
    return (function createSlug (temporarySlug: string, increment: number): string {
      return articleSlugs.includes(temporarySlug)
        ? createSlug(`${newSlug}-${increment}`, increment + 1)
        : temporarySlug
    })(newSlug, 0)
  }

  const onSubmit: SubmitHandler<ArticleFormInputs> = async (data: ArticleFormInputs) => {
    try {
      if (editMode && articleData) {
        await updateDoc(doc(db, "news", articleData.id), {
          ...data,
          slug: encodeURI(slugify(data.title, { lower: true, strict: true })),
          updatesTimestamp: arrayUnion(Date.now())
        })
      } else {
        await addDoc(collection(db, 'news'), {
          ...data,
          slug: createUniqueSlug(
            encodeURI(slugify(data.title, { lower: true, strict: true })),
            articlesSnapshot!.docs.map(doc => doc.data().slug),
          ),
          timestamp: Date.now(),
        })
      }
      setAlertMessage({ type: 'success', message: 'Článek byl uložen' })
      setOpen(true)

    } catch (error) {
      setAlertMessage({ type: 'error', message: 'Stala se nějaká chyba' })
      setOpen(true)
      console.log(error)
    }
  }

  return (
    <Container sx={{ my: '2rem' }}>
      <Paper elevation={2} sx={{ maxWidth: '50rem' }}>
        <Box
          component='form'
          onSubmit={articleForm.handleSubmit(onSubmit)}
          sx={{
            p: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <Typography variant='h2' fontWeight='bold'>{editMode ? 'Upravit článek' : 'Nový článek'}</Typography>
            <Box sx={{ display: 'flex', gap: '.5rem' }}>
              {lessThanSm ? (
                <IconButton color='secondary' aria-label='Storno'>
                  <Cancel/>
                </IconButton>
              ) : (
                <Button
                  startIcon={<Cancel/>}
                  variant='outlined'
                  color='secondary'
                  size='small'
                  onClick={() => void push('/portal')}
                >
                  Storno
                </Button>
              )}
              {editMode && articleData ?
                lessThanSm ? (
                  <IconButton color='error' aria-label='Smazat'>
                    <DeleteOutline/>
                  </IconButton>
                ) : (
                  <Button
                    startIcon={<DeleteOutline/>}
                    variant='outlined'
                    color='error'
                    size='small'
                    onClick={() => {
                      void handleDelete(articleData.id)
                      void push('/portal')
                    }}
                  >
                    Smazat
                  </Button>
                ) : null}
            </Box>
          </Box>
          <TextField
            type='text'
            color='info'
            label='Titulek'
            {...articleForm.register('title', {
              required: 'Vyplňte titulek'
            })}
          />
          <FormProvider {...articleForm}>
            <TipTapEditor/>
          </FormProvider>
          <Box sx={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <Box>
              {lessThanSm ? (
                <IconButton color='warning' aria-label='Reset'>
                  <Replay/>
                </IconButton>
              ) : (
                <Button
                  startIcon={<Replay/>}
                  variant='outlined'
                  color='warning'
                  onClick={handleReset}
                  disabled={!articleForm.formState.isDirty}
                >
                  Začít od znova
                </Button>
              )}
            </Box>
            <Box>
              <FormControlLabel
                label='Veřejný'
                control={
                  <Checkbox
                    checked={articleForm.watch('isPublished')}
                    {...articleForm.register('isPublished')}
                  />
                }
              />
              <Button
                startIcon={<Save/>}
                variant='contained'
                type='submit'
              >
                Uložit
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        onClose={handleClose}
      >
        <Alert severity={alertMessage.type} onClose={handleClose}>{alertMessage.message}</Alert>
      </Snackbar>
    </Container>
  )
}
