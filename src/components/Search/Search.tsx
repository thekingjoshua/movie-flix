import React, {useState, useEffect} from 'react'
import { TextField, InputAdornment, colors,  } from '@mui/material'
import {Search as SearchIcon} from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import {useTheme} from '@mui/material/styles'
import {styled} from '@mui/system'
import { searchMovie } from '../../features/currentGenreOrCatergory'

const SearchContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  }));

  const Input = styled(TextField)(({ theme }) => ({
    '& .MuiInputBase-input': {
      color: theme.palette.mode === 'light' ? 'white' : 'black',
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: 'white',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white',
    },
    filter: theme.palette.mode === 'light' ? 'light' : 'invert(1)',
    [theme.breakpoints.down('sm')]: {
      marginTop: '-10px',
      marginBottom: '10px',
    },
  }));

const Search = () => {
    const theme = useTheme()
    const [query, setQuery] =  useState<string>()
    const dispatch = useDispatch()
    const classes = {
        input: { color: theme.palette.mode === 'light' ? 'white' : 'black', filter: theme.palette.mode === 'light' ? 'light' : 'invert(1)', [theme.breakpoints.down('sm')]: { marginTop: '-10px', marginBottom: '10px'}},
        searchIcon: { color: theme.palette.mode === 'light' ? 'white' : 'black'}
    }
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter'){
            dispatch(searchMovie(query))
            console.log('working')
        }

    }
    return (
        <SearchContainer>

        <Input onKeyPress={handleKeyPress} onChange={(e) => setQuery(e.target.value)} variant="standard" InputProps={{sx: classes.input, startAdornment: (
            <InputAdornment sx={classes.searchIcon} position='start'>
                <SearchIcon/>
            </InputAdornment>
        )}} 
        
        />
        </SearchContainer>
  )
}

export default Search