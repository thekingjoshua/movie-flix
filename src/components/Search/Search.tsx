import React, {useState, useEffect} from 'react'
import { TextField, InputAdornment, colors,  } from '@mui/material'
import {Search as SearchIcon} from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import {useTheme} from '@mui/material/styles'



const Search = () => {
    const theme = useTheme()
    const [query, setQuery] =  useState<string>()
    const classes = {
        searchContainer: {
            [theme.breakpoints.down('sm')]: {
                display: 'flex',
                justifyContent: 'center',
                width: '100%'
            }
        },
        input: {
            color: theme.palette.mode === 'light' ? 'light' : 'black',
            filter: theme.palette.mode === 'light' ? 'light' : 'invert(1)',
            [theme.breakpoints.down('sm')]: {
                marginTop: '-10px',
                marginBottom: '10px'
            }
        }
    }
    const handleKeyPress = () => {

    }
    return (
    <div style={classes.searchContainer}>
        <TextField onKeyPress={handleKeyPress} value={query} onChange={(e) => setQuery(e.target.value)} variant="standard" 
        InputProps={{style: classes.input, startAdornment: (
            <InputAdornment position='start'>
                <SearchIcon/>
            </InputAdornment>
        )}} 
        
        />
    </div>
  )
}

export default Search