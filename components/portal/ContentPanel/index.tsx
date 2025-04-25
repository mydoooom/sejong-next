import { CalendarMonth, Folder, Groups2, Newspaper, Web } from '@mui/icons-material'
import { Tabs, Tab, Box, Typography } from '@mui/material'
import { ReactNode, SyntheticEvent, useState } from 'react'
import MerchPanel from './MerchPanel'

const tabs: { label: string, component: ReactNode }[] = [
  {
    label: 'Merch',
    component: <MerchPanel/>
  },
  {
    label: 'Other',
    component: 'Other'
  }
]

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const a11yProps = (index: number) => {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`
  }
}

export default function ContentPanel() {
  const [currentTab, setCurrentTab] = useState(0)

  const handleChangeTab = (_event: SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue)
  }
  return (
    <Box
      sx={{ display: 'flex' }}>
      <Tabs
        orientation="vertical"
        value={currentTab}
        onChange={handleChangeTab}
        variant='scrollable'
        scrollButtons='auto'
        allowScrollButtonsMobile
        aria-label='tabs'
      >
        {tabs.map(({ label }, index) => (
          <Tab key={index} label={label} {...a11yProps(index)}/>
        ))}
      </Tabs>
      {tabs.map((tab, index) => (
        <TabPanel key={index} index={index} value={currentTab}>
          {tab.component}
        </TabPanel>
      ))}
    </Box>
  )
}