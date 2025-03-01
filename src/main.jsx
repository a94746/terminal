import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {StyleSheetManager} from "styled-components";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <StyleSheetManager shouldForwardProp={() => true}>
          <App />
      </StyleSheetManager>
  </StrictMode>,
)
