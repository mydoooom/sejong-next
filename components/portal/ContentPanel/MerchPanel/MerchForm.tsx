import {
  Box,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Paper,
  Select,
  TextField,
  Button
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { ChangeEvent, useState } from 'react'
import Image from 'next/image'
import { useMerchCategories } from '../../../../lib/useMerchCategories'
import { MerchInsert, useMerchMutation } from '../../../../lib/useMerchMutation'
import { supabase } from '../../../../supabase'
import { Merch } from '../../../../lib/useMerch'

interface MerchFormProps {
  editMode?: boolean
  merch?: Merch
}

export function MerchForm ({ editMode, merch }: MerchFormProps) {
  const { data: merchCategories } = useMerchCategories()
  const {  control, handleSubmit } = useForm<MerchInsert>({
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

  const { mutate, isPending, isError, error } = useMerchMutation()

  const [temporaryImageUrl, setTemporaryImageUrl] = useState('')
  const [imageToBeUploaded, setImageToBeUploaded] = useState<File | null>(null)

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
            <Controller
              name='description'
              control={control}
              render={({ field }) => (
                <TextField multiline {...field} label='Popis'/>
              )}
            />
            <Controller
              name='archived'
              control={control}
              render={({ field }) => (
                <FormGroup>
                  <FormControlLabel control={<Checkbox {...field}/>} label='Zobrazit'/>
                </FormGroup>
              )}
            />
            <Controller
              name='category_id'
              control={control}
              render={({ field }) => (
                <FormControl>
                  <Select {...field} label='Kategorie'>
                    {merchCategories?.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
            <Image src={temporaryImageUrl} width={100} height={100} alt='uploaded image'/>
            <Button variant="contained" component="label">
              Nahrát obrázek
              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                hidden
              />
            </Button>
            <Button type='submit'>odeslat</Button>
          </Box>
        </Paper>
      </Container>
    </>
  )
}