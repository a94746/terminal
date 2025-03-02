import styled from "styled-components";

const StyledLine = styled.p `
    margin: 0;
    color: ${p => p.theme.colors.secondary};
    white-space: pre-wrap; 
    word-wrap: break-word;
`

export default function Line({children}) {
    return(
        <StyledLine>{children}</StyledLine>
    )
}