import React, { Dispatch, SetStateAction } from 'react'
import { Button, Typography, useTheme } from '@mui/material'


type PaginationProps = {
    currentPage: number,
    setPage: Dispatch<SetStateAction<number>>,
    totalPages: number
}
const Pagination = (props: PaginationProps) => {
    const theme = useTheme()
    
    const classes = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        button: {
            margin: '30px 20px'
        },
        pageNumber: {
            margin: '0 20px !important',
            color: theme.palette.text.primary
        },
    }
    const currentPage = 1
    const handlePrev = () => {
        
    }
    const handleNext = () => {

    }

    if(props.totalPages === 0) return null

  return (
    <div style={classes.container}>
        <Button style={classes.button} variant='contained' color="primary" type="button">Previous</Button>
        <Typography variant="h4" style={classes.pageNumber}>{currentPage}</Typography>
        <Button style={classes.button} variant='contained' color="primary" type="button">Next</Button>
    </div>
  )
}

export default Pagination