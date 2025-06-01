import { Subform } from '@/components/portal/ContentPanel/MerchPanel/Subform'
import {
  Box,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  Paper,
  TextField,
  Button,
  Stack, Autocomplete
} from '@mui/material'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { ChangeEvent, useMemo, useState } from 'react'
import Image from 'next/image'
import { MerchCategory, useMerchCategories } from '@/api/hooks/merch/useMerchCategories'
import { MerchInsert, useMerchMutation } from '@/api/hooks/merch/useMerchMutation'
import { Merch } from '@/api/hooks/merch/useMerch'
import { supabase } from '@/supabase'

interface MerchFormProps {
  editMode?: boolean
  merch?: Merch
}

export function MerchForm ({ editMode, merch }: MerchFormProps) {
  const [isCategoriesSelectOpen, setIsCategoriesSelectOpen] = useState(false)
  const {
    data: merchCategories,
    isLoading: isLoadingMerchCategories,
    isError: isErrorMerchCategories,
    error: errorMerchCategories,
  } = useMerchCategories({ enabled: isCategoriesSelectOpen })

  const merchCategoriesMap = useMemo(() => {
    if (!merchCategories) return new Map()

    return new Map(merchCategories.map(category => [category.id, category.name]))
  }, [merchCategories])

  const { getValues, control, handleSubmit } = useForm<MerchInsert>({
    defaultValues: editMode && merch ? {
      ...merch
    } : {
      name: '',
      description: '',
      image_url: null,
      archived: false,
      category_id: '',
    }
  })

  const selectedCategoryId = useWatch({
    control,
    name: 'category_id'
  })

  const [temporaryImageUrl, setTemporaryImageUrl] = useState<string | null>(null)
  const [imageToBeUploaded, setImageToBeUploaded] = useState<File | null>(null)

  const { mutate: mutateMerch } = useMerchMutation()

  const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) return

    const file = event.target.files[0]
    setImageToBeUploaded(file)
    setTemporaryImageUrl(URL.createObjectURL(file))
  }

  const onSubmit = async (data: MerchInsert) => {
    if (imageToBeUploaded) {
      const fileName = `${Date.now()}_${imageToBeUploaded.name}`;
      const {
        data: uploadedFile,
        error: uploadError,
      } = await supabase.storage.from('sejong').upload(`merch/${fileName}`, imageToBeUploaded, { upsert: true })

      if (uploadError) {
        // TODO make this more user friendly
        console.log(uploadError)
      } else {
        const { data: imageUrl } = supabase.storage.from('sejong').getPublicUrl(uploadedFile.path)
        data.image_url = imageUrl.publicUrl
      }
    }

    mutateMerch(data)
  }

  return (
    <>
      <Container sx={{ my: '2rem' }}>
        <Paper elevation={0} variant='outlined' sx={{ maxWidth: '50rem' }}>
          <Box
            component='form'
            sx={{
              m: "2rem"
            }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Stack spacing={2}>
              <Controller
                name='name'
                control={control}
                render={({ field }) => (
                  <TextField {...field} label='Název'/>
                )}
              />
              <Controller
                name='description'
                control={control}
                render={({ field }) => (
                  <TextField multiline minRows={3} {...field} label='Popis'/>
                )}
              />
            </Stack>
            <Box sx={{
              display: 'flex',
              my: '1rem',
              gap: '1rem',
              alignItems: 'center',
            }}>
              <Box
                sx={{
                  width: 'auto',
                  height: '8rem',
                  aspectRatio: '3/2',
                  overflow: 'hidden',
                }}
              >
                <Image
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                  src={temporaryImageUrl ?? '/image-placeholder.svg'} width={200} height={200} alt='uploaded image'/>

              </Box>
              <Button variant="contained" component="label">
                Nahrát obrázek
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                  hidden
                />
              </Button>
              {imageToBeUploaded &&
                <Button
                  onClick={() => {
                    setImageToBeUploaded(null)
                    setTemporaryImageUrl(null)
                  }}
                >
                  Zrušit
                </Button>
              }
            </Box>
            <Stack>
              <Controller
                name='category_id'
                control={control}
                render={({ field: { onChange } }) => (
                  <FormControl>
                    <Autocomplete
                      open={isCategoriesSelectOpen}
                      onOpen={() => setIsCategoriesSelectOpen(true)}
                      onClose={() => setIsCategoriesSelectOpen(false)}
                      onChange={(_, newValue) =>
                        newValue && onChange(newValue.id)
                      }
                      loading={isLoadingMerchCategories}
                      loadingText='Načítání...'
                      options={merchCategories ?? []}
                      getOptionLabel={(option) => option.name}
                      renderInput={(params) =>
                        <TextField
                          {...params}
                          label='Zvol variantu'
                          error={isErrorMerchCategories}
                          helperText={errorMerchCategories?.message}
                        />
                      }
                    />
                  </FormControl>
                )}
              />
              {selectedCategoryId && <Subform category={merchCategoriesMap.get(selectedCategoryId)}/>}
            </Stack>
            <Controller
              name='archived'
              control={control}
              render={({ field }) => (
                <FormGroup>
                  <FormControlLabel control={<Checkbox {...field}/>} label='Archivovat'/>
                </FormGroup>
              )}
            />
            <Box sx={{
              display: 'flex',
              justifyContent: 'end',
              my: '1rem'
            }}>
              <Button type='submit'>odeslat</Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </>
  )
}