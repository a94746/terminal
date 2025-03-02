import {useEffect, useState} from "react"
import styled from "styled-components"
import sleep from "../../common/utils/SleepService.js";
import doCdCommand, {isCdCommand} from "../../commands/CdCommand.js";
import doSayHelloCommand, {isSayHelloCommand} from "../../commands/SayHelloCommand.js";
import useTextarea from "./useTextarea.js";

export const lastCharOfTerminal = ">"
const defaultCommandValue = " "

const StyledTextarea = styled.textarea`
    width: 100%;
    background: ${p => p.theme.colors.primary};
    color: ${p => p.theme.colors.secondary};
    border: none;
    resize: none;
    overflow: hidden;
    &:focus {
        outline: none;
    }
`

export default function Textarea({addLine, setAnswerToLastLine, getLinesLength, getCommandByReverseIndex}) {
    const textarea = useTextarea(defaultCommandValue)
    const [reverseCommandIndex, setReverseCommandIndex] = useState(0)

    useEffect(() => {
        setCursor(textarea.ref, textarea.path.length)
    }, [textarea.path]);

    useEffect(() => {
        textarea.ref.current.style.height = textarea.ref.current.scrollHeight + 'px';
    }, [textarea.command]);

    function correctCursorPosition() {
        if (textarea.ref.current.selectionStart < textarea.path.length) {
            setCursor(textarea.ref, textarea.path.length)
        }
    }

    function handleKeyDown(p) {
        correctCursorPosition()
        switch (p.key) {
            case 'Enter': handleEnter(p); break
            case 'ArrowUp': handleArrowUp(p); break
            case 'ArrowDown': handleArrowDown(p); break
        }
    }

    function handleArrowUp(p) {
        handleArrow(p, Math.min(reverseCommandIndex + 1, getLinesLength()))
    }
    function handleArrowDown(p) {
        handleArrow(p, Math.max(reverseCommandIndex - 1, 0))
    }
    function handleArrow(p, newReverseCommandIndex) {
        p.preventDefault()
        if (!textarea.editable) return
        textarea.setCommand(getCommandByReverseIndex(newReverseCommandIndex))
        setReverseCommandIndex(newReverseCommandIndex)
    }

    function handleEnter(p) {
        p.preventDefault()
        if (textarea.command.trim().length > 0) {
            addLine(textarea.path, textarea.command)
            textarea.setCommand(defaultCommandValue)
            processCommand()
        }
    }

    async function processCommand() {
        textarea.setEditable(false)

        const trimmedCommand = textarea.command.trim()
        if (isCdCommand(trimmedCommand)) {
            doCdCommand(trimmedCommand, textarea.path, textarea.setPath)
        } else if (isSayHelloCommand(trimmedCommand)) {
            doSayHelloCommand(printAnswer)
        } else {
            await printAnswer("The command was not recognized!")
        }

        textarea.setEditable(true)
    }

    async function printAnswer(answerPhrase) {
        for (let i = 0; i <= answerPhrase.length; i++) {
            await sleep(50)
            setAnswerToLastLine(answerPhrase.substring(0, i))
        }
    }

    return (
        <StyledTextarea {...textarea.bind}
                        onKeyDown={handleKeyDown} onKeyUp={correctCursorPosition} onMouseUp={correctCursorPosition}/>
    )
}

function setCursor(textareaRef, pathLength) {
    textareaRef.current.focus();
    textareaRef.current.setSelectionRange(pathLength, pathLength);
}
