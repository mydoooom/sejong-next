import { Container } from '@mui/material'
import { DocumentData } from 'firebase/firestore'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.css'
import ReactHtmlParser from 'react-html-parser'
import styles from './Introduction.module.scss'

interface Props {
  slidesData: DocumentData[]
}

export default function Introduction ({ slidesData }: Props) {
  return (
    <Swiper style={{height: '600px'}}>
      {
        slidesData && slidesData.map(slideData => (
          <SwiperSlide style={{height: '600'}}>
            <Container className={styles.textContainer}>
              <h1>{ReactHtmlParser(slideData.title)}</h1>
              <p>{ReactHtmlParser(slideData.text)}</p>
            </Container>
            <img
              src={slideData.backgroundURL}
              className={styles.slideImage}
              alt={slideData.title}
            />
          </SwiperSlide>
        ))
      }
    </Swiper>
  )
}