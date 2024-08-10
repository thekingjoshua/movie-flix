import {Grid, Box, CircularProgress, styled, Typography, Rating, ButtonGroup, Button, Modal} from '@mui/material'
import {Link, useParams} from 'react-router-dom'
import { useGetMovieQuery, useGetRecommendationsQuery } from '../../services/TMDB'
import {useTheme} from '@mui/material'
import genreIcons from '../../assets/genres'
import { useDispatch } from 'react-redux'
import { selectGenreOrCategory } from '../../features/currentGenreOrCatergory'
import {ArrowBack, Favorite, FavoriteBorderOutlined, Language, MovieCreation, PlusOne, Remove, Theaters } from '@mui/icons-material'
import MovieList from '../MovieList/MovieList'
import { useState } from 'react'


const CImg = styled('img')(({theme}) => ({
  borderRadius: '20px',
  boxShadow: '0.5em 1em 1em rgb(64, 64, 70)', 
  width: '80%', 
  [theme.breakpoints.down('md')]: {
    height: '350px',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%', 
    marginBottom: '30px',
  },
}))

type GenreKeys = keyof typeof genreIcons;


const MovieInformation = () => {
  const {id} = useParams()
  const {data, isFetching, error} = useGetMovieQuery(id)
  const {data: recommendations, isFetching: isFetchingRecommendations} = useGetRecommendationsQuery({list: '/recommendations', movie_id: id})
  const theme = useTheme()
  const dispatch = useDispatch()
  const [open, setOpen] = useState<boolean>(false)

  console.log(data)
  console.log(recommendations)
  console.log('okay')


  const classes = {
    containerSpaceAround: { 
      display: 'flex', justifyContent: 'space-evenly', alignItems: 'flex-start', width: '100%', margin: '10px 10px !important',
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
    genresContainer: {margin: '25px 0 !imporant', display: 'flex', justifyContent: 'space-around', paddingTop: '2rem'},
    links: {display: 'flex', justifyContent: 'center', alignItems: 'center', textDecoration: 'none',
      [theme.breakpoints.down('sm')]: {
        padding: '0.5rem 1rem'
    }},
    genreImage: {filter: theme.palette.mode === 'dark' ? 'invert(1)' : ''},
    castImage: {
      width: '100%',
      maxWidth: '7em',
      heigth: '8em'
    },
    buttonsContainer:{
      width: '100%',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column'
      }
    }, 
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    video: {
      width: '50%',
      height: '50%',
      [theme.breakpoints.down('sm')]: {
      width: '90%',
      height: '90%'
      }
    }
  }

  const isMovieFavourited = false
  const isMovieWatchListed = false

  const addToFavourites = () => {}

  const addToWatchList = () => {}


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
      <Grid item container direction="column" lg={7} style={{marginRight: '50px'}}>
        <Typography variant="h3" align='center' gutterBottom> {data?.title} ({data?.release_date.split('-')[0]})</Typography>
        <Typography variant="h5" align='center' gutterBottom> {data?.tagline}</Typography>
        <Grid item style={classes.containerSpaceAround}>
          <Box sx={classes.ratingBox} >
            <Rating readOnly value={data.vote_average / 2}/>
            <Typography variant='subtitle1' style={{marginLeft: '15px'}}>{(data?.vote_average).toFixed(1) } / 10</Typography>
            <Typography variant='h6' alignItems="center" style={{marginLeft: '40px'}}>{data?.runtime} min / Language: {data?.spoken_languages.length > 0 ? data?.spoken_languages[0].name : ''}</Typography>
          </Box>
        </Grid>
        <Grid style={classes.genresContainer} item >
          {data?.genres?.map((genre: {name: string, id: number}) => (
            <Link key={genre?.name} style={classes.links} to='/' onClick={() => dispatch(selectGenreOrCategory(genre.id))}>
              <img src={genreIcons[genre.name.toLowerCase() as GenreKeys]} style={classes.genreImage} height={30} />
              <Typography color="textPrimary" variant="subtitle1" style={{textDecoration: 'none'}}>{genre?.name}</Typography>
            </Link>
          ))}
        </Grid>
        <Typography variant="h5" gutterBottom style={{marginTop: '10px'}}>
            Overview
        </Typography>
        <Typography style={{marginBottom: '2rem'}}>
          {data?.overview}
        </Typography>
        <Typography variant="h5" gutterBottom> Top Cast</Typography>
        <Grid item container spacing={2}>
          {data?.credits?.cast.map((character: {profile_path: string, id: number, name: string, character: string}, i: number) => (
            <Grid key={i} item xs={4} md={2} component={Link} to={`/actors/${character?.id}`} style={{textDecoration: 'none'}}>
                <img style={classes.castImage} src={`https://image.tmdb.org/t/p/w500${character?.profile_path}`} alt={character.name} />
                <Typography color="textPrimary">{character?.name}</Typography>
                <Typography color="textSecondary">'{character?.character.split('/')[0]}'</Typography>
              </Grid>
          )).slice(0, 6)}
        </Grid>
        <Grid item container style={{marginTop: '2rem'}} >
          <div style={classes.buttonsContainer}>
            <Grid item xs={12} sm={6} style={classes.buttonsContainer}>
              <ButtonGroup size="medium" variant="outlined">
                <Button target='_blank' rel='noopener noreferrer' href={data?.homepage} endIcon={<Language/>}>Website</Button>
                <Button target='_blank' rel='noopener noreferrer' href={`https://www.imdb.com/title/${data?.imdb_id}`} endIcon={<MovieCreation/>}>IMDB</Button>
                <Button onClick={() => {setOpen(true)}} href="#" endIcon={<Theaters/>}>Trailer</Button>
              </ButtonGroup>
            </Grid>
            <Grid item xs={12} sm={6} style={classes.buttonsContainer}>
              <ButtonGroup size="small" variant="outlined">
                <Button onClick={addToFavourites} endIcon={isMovieFavourited ? <FavoriteBorderOutlined /> : <Favorite />}>{isMovieFavourited ? 'Unfavourite' : 'Favourite'}</Button>
                <Button onClick={addToWatchList} endIcon={isMovieWatchListed ? <Remove /> : <PlusOne />}>Watchlist</Button>
                <Button onClick={addToWatchList} endIcon={<ArrowBack />} sx={{borderColor: 'primary.main'}}> <Typography component={Link} to='/' color="inherit" variant="subtitle2" style={{textDecoration: 'none'}}>Back</Typography></Button>
                </ButtonGroup>
            </Grid>
          </div>
        </Grid>
      </Grid>
      <Box marginTop="5rem" width='100%'>
          <Typography variant="h3" gutterBottom align='center'> You might also like</Typography>
          {recommendations ? <MovieList movies={recommendations} numberofMovies={12}/> : <Box>No recommendations here</Box>}
      </Box>
      <Modal closeAfterTransition style={classes.modal} open={open} onClose={() => setOpen(false)}>
          {data?.videos.results.length > 0 ? <iframe style={classes.video} frameBorder='0' title="Trailer" src={`https://www.youtube.com/embed/${data.videos.results[0].key}`} allow='autoplay' /> : <p></p>}
      </Modal>
    </Grid>
  )
}

export default MovieInformation
