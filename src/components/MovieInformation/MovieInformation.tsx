import {Grid, Box, CircularProgress, styled, Typography, Rating} from '@mui/material'
import {Link, useParams} from 'react-router-dom'
import { useGetMovieQuery } from '../../services/TMDB'
import {useTheme} from '@mui/material'
import genreIcons from '../../assets/genres'


const CImg = styled('img')(({theme}) => ({
  backgroundColor: 'blue',
  display: 'flex', justifyContent: 'center', alignItems: 'center',
  borderRadius: '20px',
  boxShadow: '0.5em 1em 1em rgb(64, 64, 70)', 
  width: '80%', 
  [theme.breakpoints.down('sm')]: {
    width: '100%', 
    marginBottom: '30px',
  },
  [theme.breakpoints.down('md')]: {
    height: '350px',
  }
}))

type GenreKeys = keyof typeof genreIcons;


const MovieInformation = () => {
  const {id} = useParams()
  const {data, isFetching, error} = useGetMovieQuery(id)
  const theme = useTheme()

  const classes = {
    containerSpaceAround: { 
      display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', margin: '10px 10px !important',
      [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      flexWrap: 'wrap',
    }},
    ratingBox: {
      display: 'flex',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 0
    },
    genresContainer: {},
    links: {backgroundColor: ''},
    genreImage: {filter: theme.palette.mode === 'dark' ? 'invert(1)' : ''}
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
        <CImg src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`} alt={data?.title} />
      </Grid>
      <Grid item container direction="column" lg={7}>
        <Typography variant="h3" align='center' gutterBottom> {data?.title} ({data?.release_date.split('-')[0]})</Typography>
        <Typography variant="h5" align='center' gutterBottom> {data?.tagline}</Typography>
        <Grid item style={classes.containerSpaceAround}>
          <Box sx={classes.ratingBox} >
            <Rating readOnly value={data.vote_average / 2}/>
            <Typography variant='subtitle1' style={{marginLeft: '15px'}}>{(data?.vote_average).toFixed(1) } / 10</Typography>
            <Typography variant='h6' alignItems="center" style={{marginLeft: '40px'}}>{data?.runtime} min / {data?.spoken_languages.length > 0 ? data?.spoken_languages[0].name : ''}</Typography>
          </Box>
        </Grid>
        <Grid style={classes.genresContainer} item >
          {data?.genres?.map((genre: {name: string}) => (
            <Link key={genre?.name} style={classes.links} to='/' onClick={() => {}}>
              <img src={genreIcons[genre.name.toLowerCase() as GenreKeys]} style={classes.genreImage} height={30} />
              <Typography color="textPrimary" variant="subtitle1">
                {genre?.name}
              </Typography>
            </Link>
          ))}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default MovieInformation
