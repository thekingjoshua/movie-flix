import { useParams, useNavigate } from "react-router-dom"
import { useGetActorLinkQuery, useGetActorMovieCreditsQuery, useGetActorQuery } from "../../services/TMDB"
import { Box, Button, ButtonGroup, CircularProgress, Grid, styled, Typography, useTheme } from "@mui/material"
import { ArrowBack } from "@mui/icons-material"

const Actors = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const {data, isFetching, error} =  useGetActorQuery(id)
  const {data: actorLink, isFetching: isFetchingActorLink,} =  useGetActorLinkQuery(id)
  const {data: actorCredit, isFetching: isFetchingActorCredits} =  useGetActorMovieCreditsQuery(id)
  const theme = useTheme()
  const classes = {
    containerSpaceAround: { 
      display: 'flex', justifyContent: 'space-evenly', alignItems: 'flex-start', width: '100%', margin: '10px 10px !important',
      [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      flexWrap: 'wrap',
      backgroundColor: 'red'
    }}
  }
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

  console.log(data)
  console.log(actorLink?.imdb_id)
  console.log(actorCredit)

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
      <Button startIcon={<ArrowBack/>} onClick={() => navigate(-1)}>
        Go back
      </Button>
      </Box>
    )
  }

  return (
    <Grid style={classes.containerSpaceAround}>
      <Grid item sm={12} lg={4}>
        <CImg src={`https://image.tmdb.org/t/p/w780${data?.profile_path}`} alt={data?.name} />
      </Grid>
      <Grid item container direction="column" lg={12} sm={12} style={{marginTop: '50px'}}>
        <Typography variant="h3" align='left' gutterBottom> {data?.name}</Typography>
        <Typography variant="h5" align='left' gutterBottom>Born: {data?.birthday}</Typography>
        <Typography variant="subtitle2" align='left' gutterBottom>{data?.biography}</Typography>
        <ButtonGroup style={{justifyContent: 'space-around'}}>
            <Button target="_blank" href={`https://www.imdb.com/name/${actorLink?.imdb_id}/`}>IMDB</Button>
            <Button href="/" startIcon={<ArrowBack/>}>Back</Button>
        </ButtonGroup>
        {}
      </Grid>
    </Grid>
  )
}

export default Actors
