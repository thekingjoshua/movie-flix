import { Link } from 'react-router-dom'
import {useTheme} from '@mui/material/styles'
import { Dispatch, SetStateAction } from 'react'
import { Divider, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from '@mui/material'

import {useGetGenresQuery} from '../../services/TMDB'
import { selectGenreOrCategory } from '../../features/currentGenreOrCatergory'

import { useDispatch } from 'react-redux'

import genreIcons from '../../assets/genres'

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

    const Sidebar = ({}: SidebarProps) => {
    const theme = useTheme()
    const {data, isFetching} = useGetGenresQuery('')
    const dispatch = useDispatch();
    

    const classes = {
        imageLink: { display: 'flex', justifyContent: 'center', padding: '10% 0'}, 
        image: { width: '70%'}, 
        links: {color: theme.palette.text.primary, textDecoration: 'none'}, 
        genreImage: {filter: theme.palette.mode === 'dark' ? 'invert(1)' : ''}
    }
    type GenreKeys = keyof typeof genreIcons;

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
                    <ListItem onClick={() => dispatch(selectGenreOrCategory(value))} button>
                        <ListItemIcon>
                            <img src={genreIcons[label.toLowerCase() as GenreKeys]} style={classes.genreImage} height={30} />
                        </ListItemIcon>
                        <ListItemText primary={label} />
                    </ListItem>
                </Link>
            ))}
        </List>
        <Divider/>
            <ListSubheader>Genres</ListSubheader>
        {isFetching ? (
            <p style={{textAlign: 'center'}}>Loading...</p>
        ) : data?.genres.map((arr: {id: number, name: string}) => (
                <Link key={arr.name} style={classes.links} to='/'>
                    <ListItem onClick={() => dispatch(selectGenreOrCategory(arr.id))} button>
                        <ListItemIcon>
                            <img src={genreIcons[arr.name.toLowerCase() as GenreKeys]} style={classes.genreImage} height={30} />
                        </ListItemIcon>
                        <ListItemText primary={arr.name} />
                    </ListItem>
                </Link>
            ))}
        </>
  )
}

export default Sidebar
