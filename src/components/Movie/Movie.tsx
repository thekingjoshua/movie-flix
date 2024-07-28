import { Typography, Grid, Grow, Tooltip, Rating, useTheme, styled } from "@mui/material"
import {Link} from 'react-router-dom'

type MovieProps = {
    movie: {
        title: [],
        poster_path: string,
        id: number,
        vote_average: number
    }, 
    i: number
}

const CLink = styled(Link)(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bolder',
  textDecoration: 'none',
  flexDirection: 'column',
  [theme.breakpoints.up('sm')]: {
    display: 'flex',
    flexDirection: 'column',
  },
  '& :hover': {
    cursor: 'pointer',
    transform: 'scale(1.05)'
  }
}))

const Movie = ({movie, i}: MovieProps) => {
    const theme = useTheme() 
    const classes = {
        movie: {
            padding: '10px',
        },
        title: {
            color: theme.palette.text.primary,
            textOverflow: 'ellipsis',
            width: '230px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            marginTop: '10px',
            marginBottom: 0,
            textAlign: 'center'
        },
        image: {
          borderRadius: '20px',
          height: '300px',
          marginBottom: '10px',
          '&: hover': {
            transform: 'scale(1.05)'
          }
        }
    }

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} sx={classes.movie}>
      <Grow in key={i} timeout={(i + 1) * 300}>
        <CLink to={`/movie/${movie.id}`}>
        <img alt={movie.title.toString()} style={classes.image} src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://www.fillmurray.com/200/300"} />
            <Typography sx={classes.title} variant="h5">{movie.title}</Typography>
            <Tooltip disableFocusListener title={`${movie.vote_average.toFixed(1)} / 10`}>
                <div>
                  <Rating readOnly value={movie.vote_average  / 2} precision={0.1} />
                </div>
            </Tooltip>
        </CLink>
      </Grow>
    </Grid>
  )
}

export default Movie
