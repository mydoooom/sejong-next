import { ArticleOutlined, NewspaperOutlined } from '@mui/icons-material'
import { Box, Button, Card, CardContent, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { NewsContext } from '../../lib/context'
import formatDate from '../../utils/formatDate'
import htmlStripper from '../../utils/htmlStripper'
import textClamper from '../../utils/textClamper'
import styles from './ArticlesList.module.scss'

export const ArticlesList = () => {
  const [articlesSnapshot] = useContext(NewsContext)
  const { locale, pathname, push } = useRouter()
  const { t } = useTranslation('news')

  return (
    <Card elevation={2} sx={{ mb: '5rem' }}>
      <CardContent>
        <Typography sx={{ textAlign: 'right' }}>
          <NewspaperOutlined fontSize='large' sx={{ color: 'lightgray' }}/>
        </Typography>
        <Box sx={{ mt: '-2rem' }}>
          {articlesSnapshot?.docs ? articlesSnapshot.docs
            .filter(article => article.data().isPublished)
            .map(article => (
              <Box key={article.id} className={styles.articleCard}>
                <Box className={styles.date}>
                  <em>{formatDate(article.data().updatesTimestamp?.slice(-1), locale)}</em>
                </Box>
                <Box className={styles.article}>
                  <Typography
                    variant='h2'
                    sx={{ fontWeight: '600', mb: '1.2rem', cursor: 'pointer' }}
                    onClick={() => push(`${pathname}/${article.data().slug}`)}
                  >
                    {article.data().title}
                  </Typography>
                  <Typography variant='body1' sx={{ mb: '1rem' }}>
                    {textClamper(htmlStripper(article.data().content), 420)}
                  </Typography>
                  <Button
                    onClick={() => push(`/news/${article.data().slug}`)}
                    startIcon={<ArticleOutlined/>}
                  >
                    {t('fullArticle')}
                  </Button>
                </Box>
              </Box>
            )) : null}
        </Box>
      </CardContent>
    </Card>
  )
}
