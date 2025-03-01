import styled from "styled-components";

const StyledLine = styled.p `
    margin: 0;
    color: ${p => p.themeColors.color};
    white-space: pre-wrap; 
    word-wrap: break-word;
`

export default function Line({children, themeColors}) {
    return(
        <StyledLine themeColors={themeColors}>{children}</StyledLine>
    )
}