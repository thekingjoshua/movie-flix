import {CssBaseline, useMediaQuery} from '@mui/material'
import { Link, Route, Routes} from "react-router-dom";
import {Actors, MovieInformation, Movies, NavBar, Profile} from './index'

const App = () => {
    const isMobile = useMediaQuery('(max-width:600px)')

    const classes = {
        root: {
            display: 'flex',
            height: '100%'
        },
        content: {
            flexGrow: '1',
            paddingTop: '5em',
            marginLeft: isMobile ? '10px' : '350px'
        }
    }

    return (
        <div style={classes.root}>
                <CssBaseline />
                <NavBar/>
                <main style={classes.content}>
                <Routes>
                        {/* <Route path='/' element={<h1>hello</h1>} /> */}
                        <Route path='/' element={<Movies/>} />
                        <Route path='/movies/:id' element={<MovieInformation/>} />
                        <Route path='/actors/:id' element={<Actors/>} />
                        <Route path='/profile/:id' element={<Profile/>} />
                    </Routes>
                </main>
        </div>
    )
}

export default App