import {useEffect, useState} from 'react';
import {AppBar, IconButton, Toolbar, Drawer, Button, Avatar, useMediaQuery} from '@mui/material';
import {Menu, AccountCircle, Brightness4, Brightness7} from '@mui/icons-material'
import {Link} from 'react-router-dom'
import {useTheme} from '@mui/material/styles'
import {Search, Sidebar} from '../index'
import { fetchToken, moviesApi, createSessionId } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';

import {setUser, userSelector} from '../../features/auth'

const DRAWER_WIDTH = 240

const token = localStorage.getItem('request_token')
const sessionIdFromLocalStorage = localStorage.getItem('session_id')




const NavBar = () => {
const dispatch = useDispatch()
  const isMobile = useMediaQuery('(max-width: 600px)')
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState<boolean>(false)
  const {isAuthenticated, user} = useSelector(userSelector)
  
  useEffect(() => {
    const logInUser = async () => {
      if(token){
        if(sessionIdFromLocalStorage){
          console.log(1)
          const {data: userData} = await moviesApi.get(`/account?session_id=${sessionIdFromLocalStorage}`)
          dispatch(setUser(userData))
        }else{
          console.log(2)
          const sessionId = await createSessionId()
          const {data: userData} = await moviesApi.get(`/account?session_id=${sessionId}`)
  
          dispatch(setUser(userData))
        }
      }
    }
    logInUser()
  }, [token])
  console.log(user)

  const classes = {
      toolbar: {height: '70px', display: 'flex', justifyContent: 'space-between', marginLeft: '240px', [theme.breakpoints.down('sm')] : {marginLeft: '0', flexWrap: 'wrap'}}, 
      menuButton: { color: 'inherit', edge: 'start', outline: 'none', marginRight: theme.spacing(2), [theme.breakpoints.up('sm')] : {display: 'none'}},
      drawer: {[theme.breakpoints.up('sm')]: {width: DRAWER_WIDTH}, flexShrink: 0},
      linkButton: {
        '&:hover': {
          textDecoration: 'none'
        }
      }
  }

  return (
    <>
     <AppBar position='fixed'>
      <Toolbar sx={classes.toolbar} >
        {isMobile && (
          <IconButton sx={classes.menuButton} onClick={() => setMobileOpen(prev => !prev) }>
            <Menu/>
          </IconButton>
        )}
        <IconButton color="inherit" sx={{ml: isMobile ? 1 : 10}} onClick={() => {}}>
          {theme.palette.mode === 'dark' ? <Brightness7/> : <Brightness4/>}
        </IconButton>
        {!isMobile && <Search />}
        <div>
          {!isAuthenticated ? (
            <Button color='inherit' onClick={fetchToken}>
              Login &nbsp; <AccountCircle/>
            </Button>
          ): (
            <Button color='inherit' component={Link} to={`/profile/${user.id}`} sx={classes?.linkButton} onClick={() => {}}>
              {!isMobile && <>My Movies &nbsp;</>}
              <Avatar style={{width: 30, height: 30}} alt='Profile' src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'/>
            </Button>
          )}
        </div>
        {isMobile && <Search />}
      </Toolbar>
      </AppBar> 
      <div>
        <nav style={classes.drawer}>
            {isMobile ? (
              <Drawer variant="temporary" anchor='right' open={mobileOpen} ModalProps={{keepMounted: true}} onClose={() => setMobileOpen(prev => !prev)}>
                
                <Sidebar setMobileOpen={setMobileOpen} />
              
              </Drawer>
            ): (
              <Drawer variant='permanent' open>
                <Sidebar setMobileOpen={setMobileOpen} />
              </Drawer>
            )}
        </nav>
      </div>
    </>
  )
}

export default NavBar
