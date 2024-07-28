import {Grid, Box, CircularProgress} from '@mui/material'
import {Link, useParams} from 'react-router-dom'
import { useGetMovieQuery } from '../../services/TMDB'
import {useTheme} from '@mui/material'


const MovieInformation = () => {
  const {id} = useParams()
  const {data, isFetching, error} = useGetMovieQuery(id)
  const theme = useTheme()
  console.log(data)

  const classes = {
    containerSpaceAround: { display: 'flex', justifyContent: 'space-around', margin: '10px 0 !important', [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      flexWrap: 'wrap'
    }},
    poster: {
      backgroundColor: 'red'
    }
  }

  if(isFetching) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center'>
        <CircularProgress size="8rem"/>
      </Box>
    )
  }
  if(error) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center'>
        <Link to="/">Something has gone wrong, go back</Link>
      </Box>
    )
  }


  return (
    <Grid container style={classes.containerSpaceAround}>
      <Grid item sm={12} lg={4}>
        <img style={classes.poster} src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`} alt={data?.title} />
      </Grid>
    </Grid>
  )
}

export default MovieInformation
