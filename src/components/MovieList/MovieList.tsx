import {Grid, useTheme} from '@mui/material'
import {Movie} from '../index' 

type MovieListProps = {
    movies: {
        results: []
    }, 
    numberofMovies: number
}

const MovieList = ({movies, numberofMovies}: MovieListProps) => {
    const theme = useTheme()
    const classes = {
        moviesContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            overflow: 'auto',
            [theme.breakpoints.down('sm')]: {
                justifyContent: 'center'
            }
        }
    }
  
    return (
    <Grid container sx={classes.moviesContainer}>
      {movies?.results.slice(0, numberofMovies).map((movie, i) => (
        <Movie key={i} movie={movie} i={i} />
      ))}
    </Grid>
  )
}

export default MovieList
