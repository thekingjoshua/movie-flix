import {styled} from '@mui/system'
import {Theme} from '@mui/material'


export const RootComponent = styled('div')({
    display: 'flex', height: '100%'
})

export const Main = styled('main')({
    flexGrow: '1',
    padding: '2em',
})
//  Styles for the Navbar > Toolbar

export const navBarThemeStyles = (theme: Theme) => ({
    menuButton: theme.spacing(2), 
    [theme.breakpoints.up('sm')] : {
        // display: 'none',
        fill: 'red'
    }
})

export const toolBarThemeStyles = (theme: Theme) => ({
    [theme.breakpoints.down('sm')] : {
        marginLeft: '0',
        flexWrap: 'wrap'
    }
}) 

// export const classes = {
//     toolbar: {height: '80px', display: 'flex', justifyContent: 'space-between', marginLeft: '240px', [theme.breakpoints.up('sm')] : {
//         fill: 'red'
//     }}, 
//     marginRight: theme.spacing(2)
// }

