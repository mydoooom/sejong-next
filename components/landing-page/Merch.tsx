import { Card, CardContent, Grid } from '@mui/material'
import Image from 'next/image'
import { useMerch } from '../../lib/useMerch'
import { Heading } from './Heading'
import styles from './Merch.module.scss'

interface MerchItemProps {
  id: string
  name: string
  image: string | null
}

const MerchItem = ({ id, image, name }: MerchItemProps) => {
  return (
    <>
      <Card className={styles.merchItem}>
        <CardContent>
          {image && <Image src={image} alt={'image'} width={'500'} height={'500'} className={styles.merchItemImage}/>}
          {name}
        </CardContent>
      </Card>
    </>
  )
}

export default function Merch () {
  const { data: merch, isLoading, error } = useMerch()

  // console.log(merch)
  return (
    <section id="merch">
      <Heading text={"Merch"}/>
      <Grid container spacing={0} sx={{justifyContent: "center"}}>
        {isLoading ? <p>Loading...</p> : error ? <p>Error: {error.message}</p> : (
          merch?.map((item) => (
            <Grid key={item.id}>
            <MerchItem

                id={item.id}
                name={item.name}
                image={item.image_url}
              />
            </Grid>
          )))
        }
      </Grid>
    </section>
  )
}
