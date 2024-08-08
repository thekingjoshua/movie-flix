import React from 'react'
import { Button, Typography } from '@mui/material'

const Pagination = () => {
    const classes = {
        container: {},
        button: {},
        pageNumber: {},
    }
    const currentPage = 1


  return (
    <div style={classes.container}>
        <Button style={classes.button} variant='contained' color="primary" type="button">Prev</Button>
        <Typography variant="h4" style={classes.pageNumber}>{currentPage}</Typography>
    </div>
  )
}

export default Pagination