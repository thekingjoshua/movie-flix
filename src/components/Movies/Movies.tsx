import {useState, useEffect} from 'react'
import {Box, CircularProgress, useMediaQuery, Typography} from '@mui/material'
import {useSelector} from 'react-redux'


import { useGetMoviesQuery } from '../../services/TMDB'
import {MovieList} from '../index'
import Loader from '../Loader/Loader'


import { selectGenreOrCategory } from '../../features/currentGenreOrCatergory'

type RootState = {
  currentGenreOrCategory: {
      genreIdOrCategoryName: string
  }
}

const Movies = () => {
  const {genreIdOrCategoryName}  = useSelector((state: RootState) => state.currentGenreOrCategory)
  const { data, error, isFetching } = useGetMoviesQuery({genreIdOrCategoryName})
  
 

  if(isFetching){
    return (
      <Box display="flex" justifyContent='center'>
        {/* <CircularProgress size="4rem" /> */}
        <Loader />
      </Box>
    )
  }
  if(!data?.results.length){
    return (
      <Box display="flex" alignItems='center' mt="20px">
        <Typography variant="h4">No movies found</Typography>
      </Box>
    )
  }

  
  if (error) return 'An error has occured';

  return (
    <div>
      <MovieList movies={data}/>
    </div>
  )
}

export default Movies
