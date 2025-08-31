import {useRouter} from 'next/router'
import {getPropertyWithSuffix} from '../../lib/getPropertyWithSuffix'
import styles from './Coaches.module.scss'
import {DocumentData} from 'firebase/firestore'
import {Heading} from './Heading'
import {useTranslation} from 'next-i18next'
import {
    Button,
    Card,
    CardContent,
    Container,
    Dialog,
    DialogContent,
    IconButton,
    Paper, Typography
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ReadMoreIcon from '@mui/icons-material/ReadMore'
import convertHtmlToReact from '@hedgedoc/html-to-react'
import Image from 'next/image'
import {useState} from 'react'

interface CoachDialogData {
    name: string
    subtitle: string
    image: string
    details: string
}

interface CoachDetailsDialogProps {
    open: boolean
    onClose: () => void
    coachData: CoachDialogData | null
}

const CoachDetailsDialog = ({open, onClose, coachData}: CoachDetailsDialogProps) => {

    return (
        <Dialog open={open} onClose={onClose}>
            {coachData &&
                <>
                    <DialogContent className={styles.dialogTitle}>
                        <div className={styles.dialogAvatar}>
                            <Image
                                src={coachData.image}
                                className={styles.dialogImage}
                                fill
                                sizes={'100px'}
                                alt={coachData.name}
                            />
                        </div>
                        <div>
                            <div className={styles.dialogName}>{coachData.name}</div>
                            <small><em>{coachData.subtitle}</em></small>
                        </div>
                        <IconButton
                            aria-label="close"
                            onClick={onClose}
                            sx={{marginLeft: 'auto'}}
                        >
                            <CloseIcon/>
                        </IconButton>
                    </DialogContent>
                    <DialogContent dividers>
                        {convertHtmlToReact(coachData.details)}
                    </DialogContent>
                </>
            }
        </Dialog>
    )
}

interface Props {
    data: DocumentData[]
}

export default function Coaches({data}: Props) {
    const {t} = useTranslation('coaches')
    const {locale} = useRouter()
    const [dialogOpen, setDialogOpen] = useState(false)
    const mainCoaches = data.filter(coach => coach.role === 'main').reverse()
    const assistantCoaches = data.filter(coach => coach.role === 'assistant').reverse()
    const [coachDialogData, setCoachDialogData] = useState<CoachDialogData | null>(null)

    const handleClickOpen = ({name, subtitle, image, details}: CoachDialogData) => {
        setCoachDialogData({name, subtitle, image, details})
        setDialogOpen(true)
    }

    const handleClose = () => {
        setCoachDialogData(null)
        setDialogOpen(false)
    }

    return (
        <section id={'coaches'}>
            <Heading text={t('coaches')}/>
            <Container>
                <div className={styles.coaches}>
                    {mainCoaches.map(coach => (
                        <Card className={styles.coach} key={coach.id}>
                            <CardContent sx={{width: '100%'}}>
                                <Paper className={styles.avatar} elevation={6}>
                                    <Image src={coach.imageURL} alt={coach.name} fill sizes={'16rem'}/>
                                </Paper>
                                <Typography
                                    variant={'h2'}
                                    className={styles.name}
                                >
                                    {coach[getPropertyWithSuffix('name', locale)]}
                                </Typography>
                                <Typography
                                    variant={'body1'}
                                    className={styles.subtitle}
                                >
                                    <em>{coach[getPropertyWithSuffix('subtitle', locale)]}</em>
                                </Typography>
                                <div>{convertHtmlToReact(coach[getPropertyWithSuffix('cardText', locale)])}</div>
                            </CardContent>
                            <Button
                                className={styles.button}
                                variant={'text'}
                                onClick={() => handleClickOpen({
                                    name: coach[getPropertyWithSuffix('name', locale)],
                                    subtitle: coach[getPropertyWithSuffix('subtitle', locale)],
                                    image: coach.imageURL,
                                    details: coach.dialogText
                                })}
                            >
                                {t('more')}&nbsp;<ReadMoreIcon/>
                            </Button>
                        </Card>
                    ))}
                </div>
                <div className={styles.assistantCoaches}>
                {assistantCoaches.map(coach => (
                        <Card className={styles.coach} key={coach.id}>
                            <CardContent sx={{width: '100%'}}>
                                <Paper className={styles.avatar} elevation={6}>
                                    <Image src={coach.imageURL} alt={coach.name} fill sizes={'16rem'}/>
                                </Paper>
                                <Typography
                                    variant={'h2'}
                                    className={styles.name}
                                >
                                    {coach[getPropertyWithSuffix('name', locale)]}
                                </Typography>
                                <Typography
                                    variant={'body1'}
                                    className={styles.subtitle}
                                >
                                    <em>{coach[getPropertyWithSuffix('subtitle', locale)]}</em>
                                </Typography>
                            </CardContent>
                            <Button
                                className={styles.button}
                                variant={'text'}
                                onClick={() => handleClickOpen({
                                    name: coach[getPropertyWithSuffix('name', locale)],
                                    subtitle: coach[getPropertyWithSuffix('subtitle', locale)],
                                    image: coach.imageURL,
                                    details: coach.dialogText
                                })}
                            >
                                {t('more')}&nbsp;<ReadMoreIcon/>
                            </Button>
                        </Card>
                    ))}
                </div>
                </Container>
            <CoachDetailsDialog
                open={dialogOpen}
                onClose={handleClose}
                coachData={coachDialogData}
            />
        </section>
    )
}
