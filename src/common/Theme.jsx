import {ThemeProvider} from "styled-components";
import {createContext, useCallback, useContext, useState} from "react";

const ThemeColorChangeContext = createContext();

export const useThemeColorChange = () => useContext(ThemeColorChangeContext)

const initialTheme = {
    colors: {
        primary: "rgb(127, 127, 127)",
        secondary: "rgb(127, 127, 127)"
    }
};

export default function Theme({ children }) {
    const [theme, setTheme] = useState(initialTheme);

    const handleColorsChange = useCallback((colors) => setTheme({...theme, colors: colors})
    , [])

    return (
        <ThemeColorChangeContext.Provider value={handleColorsChange}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ThemeColorChangeContext.Provider>
    )
}

export function getGrayscaleColorString(colorNum) {
    return "rgb(" + colorNum + ", " + colorNum + ", " + colorNum + ")"
}