import Header from './components/header/Header'
import styled from 'styled-components'
import TerminalPage from './components/terminal/TerminalPage.jsx'
import WelcomePage from "./components/welcome/WelcomePage.jsx";
import Theme from "./common/Theme.jsx";
import {Route, Routes} from "react-router-dom";
import NotFoundPage from "./components/not_found/NotFoundPage.jsx";

const AppWrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    padding: 0 2rem;
    background: ${p => p.theme.colors.primary};
`

export default function App() {
    return (
        <Theme>
            <AppWrapper>
                <Header/>
                <Routes>
                    <Route path="/" title="sdsdc" element={<WelcomePage/>} />
                    <Route path="/t" element={<TerminalPage/>} />
                    <Route path="*" element={<NotFoundPage/>} />
                </Routes>
            </AppWrapper>
        </Theme>
  )
}
