import {createContext, useLayoutEffect} from "react";
import {useLocalStorage} from "./useLocalStorage";

export const ThemeContext = createContext()

const isDarkTheme = window?.matchMedia('(prefers-color-scheme: dark)').matches
const defaultTheme = isDarkTheme ? 'dark' : 'light'

export const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useLocalStorage('theme', defaultTheme)

    useLayoutEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
    }, [theme])

    return (
        <ThemeContext.Provider value={[theme, setTheme]}>
            {children}
        </ThemeContext.Provider>
    )
}