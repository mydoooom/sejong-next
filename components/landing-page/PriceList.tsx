import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Container, Grid, Typography } from '@mui/material'
import { Heading } from './Heading'
import styles from './PriceList.module.scss'

export default function PriceList() {
  const {t} = useTranslation(['price-list', 'common'])
  const { locale } = useRouter()

  const priceInCZK = (price: number) =>
    Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'CZK',
      maximumFractionDigits: 0
    }).format(price)

  return (
    <section id={'price-list'} className={styles.priceList}>
      <Heading text={t('price-list')}/>
      <Container>
        <Grid container spacing={4} sx={{mb: '2rem'}}>
          <Grid item xs={12} sm={6}>
            <Typography variant={'h2'}>{t('primary-school', { ns: 'common' })} Horáčkova</Typography>
            <table>
              <tbody>
              <tr>
                <td>
                  <span>
                  {`${t('children-6-9', { ns: 'common' })} (${t('wednesday', { ns: 'common'})} 16:30)`}:
                  </span>
                </td>
                <td>{`${priceInCZK(2000)}/${t('term')}`}</td>
              </tr>
              <tr>
                <td>
                  <span>
                    {`${t('children-10-15', { ns: 'common' })} (${t('tuesday-and-thursday', { ns: 'common'})} 16:30)`}:
                  </span>
                </td>
                <td>{`${priceInCZK(2500)}/${t('term')}`}</td>
              </tr>
              <tr>
                <td>
                  <span>
                    {`${t('juniors-and-adults', { ns: 'common' })} (${t('tuesday-and-thursday', { ns: 'common'})} 18:30)`}:
                  </span>
                </td>
                <td>{`${priceInCZK(3000)}/${t('term')}`}</td>
              </tr>
              </tbody>
            </table>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant={'h2'}>{t('primary-school', { ns: 'common' })} Smolkova</Typography>
            <table>
              <tbody>
              <tr>
                <td>
                  <span>
                    {`${t('children-6-12', { ns: 'common' })} (${t('friday', { ns: 'common'})} 15:30)`}:
                  </span>
                </td>
                <td>{`${priceInCZK(2400)}/${t('term')}`}</td>
              </tr>
              <tr>
                <td>
                  <span>
                    {`${t('adults-beginners', { ns: 'common' })} (${t('wednesday', { ns: 'common'})} 18:30)`}:
                  </span>
                </td>
                <td>{`${priceInCZK(2400)}/${t('term')}`}</td>
              </tr>
              </tbody>
            </table>
          </Grid>
        </Grid>
        <p>
          <span>{t('you-can-pay-by-bank-transfer')}:</span>&nbsp;154282135/0300
        </p>
        <p>
          <span>{t('message-to-recipient')}:</span>&nbsp;{t('name-and-surname-of-exerciser')}
        </p>
        <p>
          <span>{t('variable-symbol')}:</span>&nbsp;{t('ni-number')}
        </p>
        <small>{t('insurance-note')}</small>
      </Container>
    </section>
  )
}
