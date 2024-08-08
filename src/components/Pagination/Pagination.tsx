import { Button, Typography } from '@mui/material'
import React from 'react'

const Pagination = () => {
    const classes = {
        container: {},
        button: {},

    }


  return (
    <div style={classes.container}>
        <Button style={classes.button} variant='contained' color="primary" type="button">Prev</Button>
    </div>
  )
}

export default Pagination