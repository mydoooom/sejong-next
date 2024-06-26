import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { Box, Card, CardContent, Paper, Typography } from '@mui/material'
import { Grade } from '@mui/icons-material'
import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { times } from 'lodash'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, FreeMode } from 'swiper/modules'
import { DocumentData } from 'firebase/firestore'
import styles from './References.module.scss'
import { theme } from '../../styles/mui-theme'

const SwiperNavigationButtons = () => {

  return (
    <Box display='flex' justifyContent='center' gap='2rem'>
      <IconButton
        className='references-nav-prev'
        size='large'
      >
        <ArrowBackIosNewIcon/>
      </IconButton>
      <IconButton
        className='references-nav-next'
        size='large'
      >
        <ArrowForwardIosIcon/>
      </IconButton>
    </Box>
  )
}

interface ReferenceCardProps {
  text: string,
  avatarImage?: string,
  name: string
}

const ReferenceCard = ({text, avatarImage, name}: ReferenceCardProps) => (
  <>
    <Card className={styles.reference}>
      <CardContent>
        <Typography variant={'body2'}>{text}</Typography>
      </CardContent>
      <Paper elevation={6} className={styles.avatar}>
        {avatarImage &&
          <Image
            className={styles.image}
            src={avatarImage}
            fill
            sizes={'100px'}
            alt={name}
          />
        }
      </Paper>
      <div className={styles.name}>
        <Typography variant={'body1'}>{name}</Typography>
      </div>
      <div className={styles.rating}>
        {times(5, (i) => (
          <Grade key={i} sx={{color: '#FFC107', fontSize: '1.2rem'}}/>
        ))}
      </div>
    </Card>
  </>
)

interface Props {
  data: DocumentData[]
}

export default function References({data}: Props) {
  const { t } = useTranslation('common')
  const muiBreakpoints = theme.breakpoints.values
  const carouselBreakpoints = {
    [muiBreakpoints.sm]: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    [muiBreakpoints.lg]: {
      slidesPerView: 4,
      spaceBetween: 30,
      initialSlide: 1
    },
  }

  return (
    <section id={'references'} className={styles.references}>
      <Typography variant={'h2'} className={styles.smallHeading}>{t('references')}</Typography>
      <Swiper
        modules={[Autoplay, FreeMode, Navigation]}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false
        }}
        navigation={{
          prevEl: '.references-nav-prev',
          nextEl: '.references-nav-next'
        }}
        slidesPerView={1}
        spaceBetween={10}
        initialSlide={0}
        centeredSlides={true}
        freeMode={{
          enabled: true,
          sticky: true
        }}
        breakpoints={carouselBreakpoints}
      >
        {data && data.map(reference => (
          <SwiperSlide key={reference.id}>
            <ReferenceCard
              text={reference.text}
              avatarImage={reference.photoURL}
              name={reference.name}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <SwiperNavigationButtons/>
    </section>
  )
}
