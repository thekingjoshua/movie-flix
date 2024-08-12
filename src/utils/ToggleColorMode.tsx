import { createContext, ReactNode, SetStateAction, useMemo, useState, Dispatch } from 'react'
import { PaletteMode, ThemeProvider, createTheme } from '@mui/material'

type ColorModeContextType = {
    mode: PaletteMode;
    toggleColorMode: () => void;
    setMode: Dispatch<SetStateAction<PaletteMode>>
}

export const ColorModeContext =  createContext<ColorModeContextType | undefined>(undefined)

type ToggleColorModeProps = {
    children: ReactNode
}

const ToggleColorMode = ({children}: ToggleColorModeProps) => {
    const [mode, setMode] = useState<PaletteMode>('light')

    const theme = useMemo(() => createTheme({
        palette: {
            mode,
        }
    }), [mode])

    const toggleColorMode = () => {
        setMode((prevMode) => prevMode === 'light' ? 'dark' : 'light')
    }

    return (
    <ColorModeContext.Provider value={{mode, setMode, toggleColorMode}}>
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    </ColorModeContext.Provider>
    )
}

export default ToggleColorMode