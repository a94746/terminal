import styled from "styled-components";

const StyledInputRange = styled.input`
    width: 100%;
    margin: 0;
    background: transparent;
    color: transparent;
    -webkit-appearance: none;
    outline: none;
    border: none;
    cursor: pointer;

    &::-webkit-slider-thumb {
        width: 8rem;
        height: 2rem;
        background: #424242;
        -webkit-appearance: none;
        cursor: ew-resize;
        transition: 0.2s ease-in-out;

        &:hover {
            width: 9rem; 
        }
    }
`

export default function InputRange(props) {
    return (
        <StyledInputRange type="range" min="-100" max="100" step="2" {...props} />
    )
}