import Header from './components/header/Header'
import styled from 'styled-components'
import Terminal from './components/console/Terminal.jsx'
import {useState} from "react";
import Welcome from "./components/welcome/Welcome.jsx";

const AppWrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    padding: 0 2rem;
    background: ${p => p.themeColors.background};
`

export default function App() {
    const [isWelcomePage, setWelcomePage] = useState(true);
    const [themeColors, setThemeColors] =
        useState({background: "rgb(127, 127, 127)", color: "rgb(127, 127, 127)"})

    function closeWelcomePage() {
        if (isWelcomePage) setWelcomePage(false);
    }

    return (
        <AppWrapper themeColors={themeColors}>
            <Header themeColors={themeColors} setThemeColors={setThemeColors} closeWelcomePage={closeWelcomePage}/>
            {isWelcomePage
                ? <Welcome/>
                : <Terminal themeColors={themeColors}/>
            }
        </AppWrapper>
  )
}
