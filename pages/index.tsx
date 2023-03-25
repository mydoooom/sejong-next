import Head from 'next/head'
import { DocumentData } from 'firebase/firestore'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useIntroductionData } from '../hooks/useIntroductionData'
import { useHeroImageURLs } from '../hooks/useHeroImageURLs'
import Hero from '../components/landing-page/Hero'
import Introduction from '../components/landing-page/Introduction'

interface Props {
  heroImageURLs: string[]
  introductionData: DocumentData[]
}

export default function Home ({ heroImageURLs, introductionData }: Props) {
  return (
    <>
      <Head>
        <title>Sejong Taekwondo</title>
        <meta name="description" content="Generated by create next app"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.png"/>
      </Head>
      <Hero heroImages={heroImageURLs}/>
      <Introduction slidesData={introductionData}/>
    </>
  )
}

export async function getStaticProps ({ locale }) {
  const heroImageURLs = await useHeroImageURLs()
  const introductionData = await useIntroductionData()

  return {
    props: {
      heroImageURLs,
      introductionData,
      ...(await serverSideTranslations(locale, [
        'common',
        'navigation'
      ]))
    }
  }
}
