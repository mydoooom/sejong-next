import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { collection, orderBy, query } from 'firebase/firestore'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import { NewsContext, UserContext } from '../lib/context'
import { auth, db } from '../lib/firebase'
import { theme } from '../styles/mui-theme'
import { appWithTranslation } from 'next-i18next'
import Navigation from '../components/layout/Navigation'
import Footer from '../components/layout/Footer'
import { CssBaseline } from '@mui/material'
import '../styles/globals.scss'

function App ({ Component, pageProps }: AppProps) {
  const authState = useAuthState(auth)
  const queryClient = new QueryClient();

  const articlesCollection = useCollection(query(
    collection(db, 'news'),
    orderBy('timestamp', 'desc')
  ))

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <UserContext.Provider value={authState}>
            <Navigation/>
            <div className='site'>
              <NewsContext.Provider value={articlesCollection}>
                <Component {...pageProps} />
              </NewsContext.Provider>
            </div>
            <Footer/>
          </UserContext.Provider>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  )
}

export default appWithTranslation(App)
