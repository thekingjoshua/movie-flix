// import {useEffect} from 'react'
// import {Divider, List, ListItem, ListItemText, ListSubheader, ListItemIcon, Box, CircularProgress} from '@mui/material'
import { Link } from 'react-router-dom'
import {useTheme} from '@mui/material/styles'
import { Dispatch, SetStateAction } from 'react'
import { Divider, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from '@mui/material'

type SidebarProps = {
    setMobileOpen: Dispatch<SetStateAction<boolean>>
}

const RED_LOGO = "https://fontmeme.com/permalink/240617/c6630a27ea06b4012057e33b52c7f45d.png"
const BLUE_LOGO = "https://fontmeme.com/permalink/240617/35f9925a1f4a2342bafd9c77633419e5.png"

const CATEGORIES = [
    {label: 'Popular', value: 'popular'},
    {label: 'Top Rated', value: 'top_rated'},
    {label: 'Upcoming', value: 'upcoming'}
]

const DEMO_CATEGORIES = [
    {label: 'Comedy', value: 'comedy'},
    {label: 'Action', value: 'action'},
    {label: 'Horror', value: 'horror'},
    {label: 'Animation', value: 'animation'}
]

// const DEMO_CATEGORIES = ['Comedy', 'Action', 'Horror', 'Animation']

    const Sidebar = (props: SidebarProps) => {
    const theme = useTheme()
    const classes = {
        imageLink: { display: 'flex', justifyContent: 'center', padding: '10% 0'}, 
        image: { width: '70%'}, 
        links: {color: theme.palette.text.primary, textDecoration: 'none'}, 
        genreImage: {filter: theme.palette.mode === 'dark' ? 'dark' : 'invert(1)'}
    }

    return (
        <>
        <Link to='/' style={classes.imageLink}>
            <img style={classes.image} src={theme.palette.mode === 'light' ? BLUE_LOGO : RED_LOGO} alt='Filmpire Logo' />
        </Link>
        <Divider />
        <List>
            <ListSubheader>Categories</ListSubheader>
        {CATEGORIES.map(({label, value}) => (
            <Link key={value} style={classes.links} to='/'>
                    <ListItem onClick={() => {}} button>
                        {/* <ListItemIcon>
                            <img src={RED_LOGO} style={classes.genreImage} height={30} />
                        </ListItemIcon> */}
                        <ListItemText primary={label} />
                    </ListItem>
                </Link>
            ))}
        </List>
        <Divider/>
            <ListSubheader>Genres</ListSubheader>
        {DEMO_CATEGORIES.map(({label, value}) => (
                <Link key={value} style={classes.links} to='/'>
                    <ListItem onClick={() => {}} button>
                        {/* <ListItemIcon>
                            <img src={RED_LOGO} style={classes.genreImage} height={30} />
                        </ListItemIcon> */}
                        <ListItemText primary={label} />
                    </ListItem>
                </Link>
            ))}
        </>
  )
}

export default Sidebar
