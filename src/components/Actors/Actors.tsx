import { useParams, useNavigate } from "react-router-dom"
import { useGetActorMovieCreditsQuery, useGetActorQuery } from "../../services/TMDB"
import { Box, Button, ButtonGroup, CircularProgress, Grid, styled, Typography, useTheme } from "@mui/material"
import { ArrowBack } from "@mui/icons-material"

const Actors = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const {data, isFetching, error} =  useGetActorQuery(id)
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
  const CImg = styled('img')(() => ({
    maxWidth: '90%',
    borderRadius: '20px',
    objectFit: 'cover',
    boxShadow: '0.5em 0.5em 1em'
  }))

  console.log(data)
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
    <Grid container spacing={3}>
      <Grid item lg={5} xl={4}>
        <CImg src={`https://image.tmdb.org/t/p/w780${data?.profile_path}`} alt={data?.name} />
      </Grid>
      <Grid item  lg={7} xl={8} style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
        <Typography variant="h2" gutterBottom> {data?.name}</Typography>
        <Typography variant="h5" align='left' gutterBottom>Born: {new Date(data?.birthday).toDateString()}</Typography>
        <Typography variant="body2" align='left' paragraph>{data?.biography || 'Sorry, no biography yet...'}</Typography>
        <Box marginTop="2rem" display="flex" justifyContent="space-around">
          <Button variant="contained" color="primary" target="_blank" href={`https://www.imdb.com/name/${data?.imdb_id}/`}>IMDB</Button>
          <Button onClick={() => navigate(-1)}  startIcon={<ArrowBack/>}> Back</Button>
        </Box>
      </Grid>
    </Grid>
  )
}

export default Actors
