import {useState} from 'react'
import {Box, Typography} from '@mui/material'
import {useSelector} from 'react-redux'


import { useGetMoviesQuery } from '../../services/TMDB'
import {MovieList, Pagination} from '../index'
import Loader from '../Loader/Loader'

type RootState = {
  currentGenreOrCategory: {
      genreIdOrCategoryName: string,
      searchQuery: string
  }
}

const Movies = () => {
  const [page, setPage] = useState<number>(1)
  const {genreIdOrCategoryName, searchQuery}  = useSelector((state: RootState) => state.currentGenreOrCategory)
  const { data, error, isFetching } = useGetMoviesQuery({genreIdOrCategoryName, page, searchQuery})


  if(isFetching){
    return (
      <Box display="flex" justifyContent='center'>
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
      <MovieList movies={data} numberofMovies={data?.results.length}/>
      <Pagination currentPage={page} setPage={setPage} totalPages={data.total_pages} />
    </div>
  )
}

export default Movies
