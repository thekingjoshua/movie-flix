import React from 'react'
import { Box, Typography } from '@mui/material'
import Movie from '../Movie/Movie'

type RatedCardsProps = {
    title: string,
    data: {
        results: []
    }
}

const classes ={
    container: {}
}


const RatedCards = ({title, data}: RatedCardsProps) => {
    console.log(data?.results)
  return (
    <Box>
        <Typography variant='h5' gutterBottom>{title}</Typography>
        <Box display="flex" flexWrap='wrap' style={classes.container}>
            {data?.results.map((movie: {title: []; poster_path: string; id: number; vote_average: number;}, i) =>(
                <Movie i={i} movie={movie} />
            ))}
        </Box>
    </Box>
  )
}

export default RatedCards