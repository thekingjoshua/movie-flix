import {CssBaseline} from '@mui/material'
import { Link, Route, Routes} from "react-router-dom";
import {Actors, MovieInformation, Movies, NavBar, Profile} from './index'
import { RootComponent, Main } from './styles';

const App = () => {

    return (
            <RootComponent>
                    <Routes>
                        <Route path='/' element={<Movies/>} />
                        <Route path='/movies/:id' element={<MovieInformation/>} />
                        <Route path='/actors/:id' element={<Actors/>} />
                        <Route path='/profile/:id' element={<Profile/>} />
                    </Routes>
                <CssBaseline />
                <NavBar/>
                <Main>
                    <Link to='/'>Home</Link>
                        <br/>
                            <br/>
                        <br/>
                    <br/>
                    <br/>
                    <br/>
                    <a href='/movies'>Link Movies</a>
                </Main>
            </RootComponent>
    )
}

export default App