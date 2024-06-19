import { Typography, Grid, Grow, Tooltip, Rating, useTheme } from "@mui/material"
import {Link} from 'react-router-dom'

type MovieProps = {
    movie: {
        title: []
    }, 
    i: number
}

const Movie = ({movie}: MovieProps) => {
    const theme = useTheme() 

    const classes = {
        movie: {
            padding: '10px'
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
        }
    }

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} sx={classes.movie}>
      <Typography sx={classes.title} variant="h5">{movie.title}</Typography>
    </Grid>
  )
}

export default Movie
