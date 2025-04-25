import { CalendarMonth, Folder, Groups2, Newspaper, Web } from '@mui/icons-material'
import { ReactElement, ReactNode, SyntheticEvent, useState } from 'react'
import { Box, Container, Paper, Tab, Tabs } from '@mui/material'
import Head from 'next/head'
import ContentPanel from '../../components/portal/ContentPanel'
import NewsPanel from '../../components/portal/NewsPanel'
import AuthCheck from '../../components/portal/AuthCheck'

const tabs: { label: string, icon: ReactElement, component: ReactNode }[] = [
  {
    label: 'Aktuality',
    icon: <Newspaper/>,
    component: <NewsPanel/>
  },
  {
    label: 'Obsah',
    icon: <Web/>,
    component: <ContentPanel/>,
  },
  {
    label: 'Členové',
    icon: <Groups2/>,
    component: 'Členové'
  },
  {
    label: 'Kalendář',
    icon: <CalendarMonth/>,
    component: 'Kalendář'
  },
  {
    label: 'Soubory',
    icon: <Folder/>,
    component: 'Soubory'
  }
]

interface TabPanelProps {
  children?: ReactNode
  index: number
  value: number
}

const TabPanel = ({ children, value, index, ...rest }: TabPanelProps) => (
  <div
    role='tabpanel'
    hidden={value !== index}
    id={`tabpanel-${index}`}
    aria-labelledby={`tab-${index}`}
    {...rest}
  >
    {value === index ? (
      <Box sx={{ p: '1rem' }}>
        {children}
      </Box>
    ) : null}
  </div>
)


const a11yProps = (index: number) => {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`
  }
}

export default function Portal () {
  const [currentTab, setCurrentTab] = useState(0)

  const handleChangeTab = (_event: SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue)
  }

  return (
    <>
      <Head>
        <title>Portal | Sejong Taekwondo</title>
        <meta name="description" content="Sejong Taekwondo – sportovní klub Taekwondo WT v Praze"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.png"/>
      </Head>
      <AuthCheck>
        <Container sx={{ my: '2rem' }}>
          <Paper variant='outlined' elevation={0}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs

                value={currentTab}
                onChange={handleChangeTab}
                variant='scrollable'
                scrollButtons='auto'
                allowScrollButtonsMobile
                aria-label='tabs'
              >
                {tabs.map((tab, index) => (
                  <Tab key={index} icon={tab.icon} iconPosition='start' label={tab.label} {...a11yProps(index)} />
                ))}
              </Tabs>
            </Box>
            <Box>
              {tabs.map((tab, index) => (
                <TabPanel key={index} index={index} value={currentTab}>
                  {tab.component}
                </TabPanel>
              ))}
            </Box>
          </Paper>
        </Container>
      </AuthCheck>
    </>
  )
}
