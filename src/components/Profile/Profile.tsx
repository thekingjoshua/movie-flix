import {userSelector} from '../../features/auth'
import {Typography, Button, Box} from '@mui/material'
import { useSelector } from 'react-redux'
import { ExitToApp } from '@mui/icons-material'
import { useGetListQuery } from '../../services/TMDB'
import {RatedCards} from '..'
import { useEffect } from 'react'

const Profile = () => {
  const {user} = useSelector(userSelector);
  const {data: favoriteMovies, refetch: refetchFavourite} = useGetListQuery({listName: 'favorite/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1})
  const {data: watchlistMovies, refetch: refetchWatchlisted} = useGetListQuery({listName: 'watchlist/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1})

  console.log(favoriteMovies?.results.length)

  useEffect(() => {
    refetchFavourite()
    refetchWatchlisted()
  }, [])


  const logOut = () => {
    localStorage.clear()

    window.location.href = "/"
  }


  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>My Profile</Typography>
        <Button color="inherit" onClick={logOut}>
          Logout &nbsp; <ExitToApp/>
        </Button>
      </Box>
      {!favoriteMovies?.results?.length ? <Typography variant="h5">Add favorites or watchlist some movies to see them here</Typography> :
      (
        <Box>
          <RatedCards title='Favorite Movies' data={favoriteMovies} />
          <RatedCards title='Watchlisted Movies' data={watchlistMovies} />
        </Box>
      )
      }
    </Box>
  )
}

export default Profile
