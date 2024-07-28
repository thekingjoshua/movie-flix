import {Grid, Box, CircularProgress, styled, Typography} from '@mui/material'
import {Link, useParams} from 'react-router-dom'
import { useGetMovieQuery } from '../../services/TMDB'
import {useTheme} from '@mui/material'

const CImg = styled('img')(({theme}) => ({
  backgroundColor: 'blue',
  display: 'flex', justifyContent: 'center', alignItems: 'center',
  borderRadius: '20px',
  boxShadow: '0.5em 1em 1em rgb(64, 64, 70)', 
  width: '50%', 
  [theme.breakpoints.down('sm')]: {
    width: '100%', 
    marginBottom: '30px',
  },
  [theme.breakpoints.down('md')]: {
    height: '350px',
  }
}))

const MovieInformation = () => {
  const {id} = useParams()
  const {data, isFetching, error} = useGetMovieQuery(id)
  const theme = useTheme()
  console.log(data)

  const classes = {
    containerSpaceAround: { 
      display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', margin: '10px 10px !important', 
      [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      flexWrap: 'wrap',
    }},
    poster: {

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
        <CImg style={classes.poster} src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`} alt={data?.title} />
        {/* <img style={classes.poster} src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`} alt={data?.title} /> */}
      </Grid>
      <Grid item container direction="column" lg={7}>
        <Typography variant="h3" align='center' gutterBottom> {data?.title} ({data?.release_date.split('-')[0]})</Typography>
      </Grid>
    </Grid>
  )
}

export default MovieInformation
