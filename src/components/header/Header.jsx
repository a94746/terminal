import styled from "styled-components"
import Time from "./Time"
import InputRange from "./InputRange.jsx";
import {useState} from "react";

const StyledHeader = styled.header`
    text-align: center;
`

const StyledH1 = styled.h1`
    display: inline-block;
    margin-top: 0;
    margin-right: 1rem;
    background: ${p => p.themeColors.background};
    color: ${p => p.themeColors.color};
`

export default function Header({themeColors, setThemeColors, closeWelcomePage}) {
    const [rangeValue, setRangeValue] = useState(0)

    function handleColorChange(e) {
        setRangeValue(e.target.value)
        closeWelcomePage()
        const newColorNum = calculateNewColorNum(e.target.value)
        setThemeColors({background: getGrayscaleColorString(newColorNum),
            color: getGrayscaleColorString(255 - newColorNum)})
    }

    return (
        <StyledHeader>
            <div >
                <InputRange value={rangeValue} onInput={handleColorChange}/>
                <div>
                    <StyledH1 themeColors={themeColors}>Terminal</StyledH1>
                    <StyledH1 themeColors={themeColors}><Time/></StyledH1>
                </div>
            </div>
        </StyledHeader>
    )
}


function getGrayscaleColorString(colorNum) {
    return "rgb(" + colorNum + ", " + colorNum + ", " + colorNum + ")"
}

function calculateNewColorNum(rangeValue) {
    return 127 + Math.cbrt(rangeValue * 20483.83)
}