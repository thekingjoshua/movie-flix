import {userSelector} from '../../features/auth'
import {Typography, Button, Box} from '@mui/material'
import { useSelector } from 'react-redux'
import { ExitToApp } from '@mui/icons-material'

const Profile = () => {
  const {user} = useSelector(userSelector);

  const logOut = () => {
    localStorage.clear()

    window.location.href = "/"
  }

  const favouriteMovies = []

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>My Profile</Typography>
        <Button color="inherit" onClick={logOut}>
          Logout &nbsp; <ExitToApp/>
        </Button>
      </Box>
      {!favouriteMovies.length ? <Typography variant="h5">Add favourites movies</Typography> : <Box>Favourite Movies</Box> }
    </Box>
  )
}

export default Profile
