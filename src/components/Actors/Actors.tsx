import { Link, useParams } from "react-router-dom"
import { useGetActorQuery } from "../../services/TMDB"
import { Box, CircularProgress, Grid, styled, useTheme } from "@mui/material"

const Actors = () => {
  const {id} = useParams()
  const {data, isFetching, error} =  useGetActorQuery(id)
  const theme = useTheme()
  const classes = {
    containerSpaceAround: { 
      display: 'flex', justifyContent: 'space-evenly', alignItems: 'flex-start', width: '100%', margin: '10px 10px !important',
      [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      flexWrap: 'wrap',
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
        <Link to="/">An error occurred while fetching actor detail, go back</Link>
      </Box>
    )
  }

  return (
    <Grid style={classes.containerSpaceAround}>
      <Grid item sm={12} lg={4}>
        <CImg src={`https://image.tmdb.org/t/p/w500${data?.profile_path}`} alt={data?.title} />
      </Grid>
    </Grid>
  )
}

export default Actors
