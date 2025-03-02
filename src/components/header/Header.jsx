import styled from "styled-components"
import Time from "./Time"
import InputRange from "./InputRange.jsx";
import {useState} from "react";
import {getGrayscaleColorString, useThemeColorChange} from "../../common/Theme.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import Title from "../../common/Title.jsx";

const StyledHeader = styled.header`
    text-align: center;
`

const StyledH1 = styled.h1`
    display: inline-block;
    margin-top: 0;
    margin-right: 1rem;
    background: ${p => p.theme.colors.primary};
    color: ${p => p.theme.colors.secondary};
`

export default function Header() {
    const [rangeValue, setRangeValue] = useState(0)
    const setThemeColors = useThemeColorChange()
    const navigate = useNavigate();
    const location = useLocation();

    function handleColorChange(e) {
        setRangeValue(e.target.value)
        const newColorNum = calculateNewColorNum(e.target.value)
        setThemeColors({primary: getGrayscaleColorString(newColorNum),
            secondary: getGrayscaleColorString(255 - newColorNum)})
        if (location.pathname !== '/t') {
            navigate('/t')
        }
    }

    return (
        <>
            <Title/>
            <StyledHeader>
                <div>
                    <InputRange value={rangeValue} onInput={handleColorChange}/>
                    <div>
                        <StyledH1>Terminal</StyledH1>
                        <StyledH1><Time/></StyledH1>
                    </div>
                </div>
            </StyledHeader>
        </>
    )
}


function calculateNewColorNum(rangeValue) {
    const number = Math.sqrt(Math.abs(rangeValue) * 161.29)
    return rangeValue < 0
        ? 127 - number
        : 127 + number
}