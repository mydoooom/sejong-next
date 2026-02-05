import { Container } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './Footer.module.scss'
import sejongSealWhite from '../../public/logos/sejongSealWhite.svg'
import wt from '../../public/logos/footer/wt.png'
import kkw from '../../public/logos/footer/kkw.png'
import cssvaz from '../../public/logos/footer/cssvaz.png'
import wte from '../../public/logos/footer/wte.png'
import moohwa from '../../public/logos/footer/moohwa.png'
import prg from '../../public/logos/footer/prg.png'
// import prg4 from '../../public/logos/footer/prg4.png'
import ceng from '../../public/logos/footer/ceng.png'
import construct from '../../public/logos/footer/construct.png'


export default function Footer () {
  const sponsors = [
    { name: 'World Taekwondo', url: 'https://www.worldtaekwondo.org/', logo: wt },
    { name: 'Kukkiwon', url: 'https://www.kukkiwon.or.kr/front/eng/main.action', logo: kkw },
    { name: 'World Taekwondo CZ', url: 'https://www.worldtaekwondo.cz/', logo: cssvaz },
    { name: 'World Taekwondo Europe', url: 'https://worldtaekwondoeurope.org/', logo: wte },
    { name: 'Moohwa', url: 'https://moohwa.net/', logo: moohwa },
    { name: 'Prague', url: 'https://www.praha.eu/', logo: prg },
    { name: 'C-ENG', url: 'https://www.c-eng.cz/', logo: ceng },
    { name: 'Construct Service', url: 'https://www.constructservice.cz/', logo: construct },
  ]
  const { pathname } = useRouter()

  return (
    <footer className={styles.footer}>
      {pathname === '/' && (
        <Container className={styles.sponsors}>
          {sponsors.map(({ url, name, logo}) => (
            <Link href={url} target={'_blank'} key={name}>
              <Image src={logo} className={styles.logo} alt={name}></Image>
            </Link>
          ))}
        </Container>
      )}
      <p className={styles.copyright}>
        <Image
          src={sejongSealWhite}
          className={styles.copyrightLogo}
          alt={'Sejong seal'}
        />
        ©&nbsp;{new Date().getFullYear()} Sejong Taekwondo
      </p>
    </footer>
  )
}
