import {AppBar, IconButton, Toolbar, Drawer, Button, Avatar, useMediaQuery, ThemeProvider} from '@mui/material';
import {Menu, AccountCircle, Brightness4, Brightness7} from '@mui/icons-material'
import {Link} from 'react-router-dom'
import {useTheme} from '@mui/material/styles'

const isAuthenticated = true


const NavBar = () => {
  const isMobile = useMediaQuery('(max-width:600px)')
  const theme = useTheme();
    
  const classes = {
      toolbar: {height: '80px', display: 'flex', justifyContent: 'space-between', marginLeft: '240px', [theme.breakpoints.down('sm')] : {marginLeft: '0', flexWrap: 'wrap'}}, 
      menuButton: { 
        color: 'inherit', edge: 'start', outline: 'none', marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')] : {display: 'none'}
      }
  }

  return (
    <>
     <AppBar position='fixed'>
      <Toolbar sx={classes.toolbar} >
        {isMobile && (
          <IconButton sx={classes.menuButton} onClick={() => {} }>
            <Menu/>
          </IconButton>
        )}
        <IconButton color="inherit" sx={{ml: 1}} onClick={() => {}}>
          {theme.palette.mode === 'dark' ? <Brightness7/> : <Brightness4/>}
        </IconButton>
        {!isMobile && 'Search...'}
        <div>
          {!isAuthenticated ? (
            <Button color='inherit' onClick={() => {}}>
              Login &nbsp; <AccountCircle/>
            </Button>
          ): (
            <Button color='inherit' component={Link} to={`/profile/:id`} className={`classes?.linkButton`} onClick={() => {}}>
              {!isMobile && <>My Movies &nbsp;</>}
              <Avatar style={{width: 30, height: 30}} alt='Profile' src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'/>
            </Button>
          )}
        </div>
        {isMobile && 'Search...'}
      </Toolbar>
      </AppBar> 
    </>
  )
}

export default NavBar
