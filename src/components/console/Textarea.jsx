import { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import sleep from "../../utils/SleepService.js";
import doCdCommand, {isCdCommand} from "../../commands/CdCommand.js";
import doSayHelloCommand, {isSayHelloCommand} from "../../commands/SayHelloCommand.js";

export const lastCharOfTerminal = ">"
const defaultCommandValue = " "

const StyledTextarea = styled.textarea`
    width: 100%;
    background: ${p => p.themeColors.background};
    color: ${p => p.themeColors.color};
    border: none;
    resize: none;
    overflow: hidden;
    &:focus {
        outline: none;
    }
`

export default function Textarea({themeColors, addLine, setAnswerToLastLine, getCommandByReverseIndex, getLinesLength}) {
    const textareaRef = useRef(null);
    const [path, setPath] = useState('C:\\users' + lastCharOfTerminal)
    const [command, setCommand] = useState(defaultCommandValue)
    const [editableTextarea, setEditableTextarea] = useState(true)
    const [reverseCommandIndex, setReverseCommandIndex] = useState(0)

    useEffect(() => {
        setСursor(textareaRef, path.length)
    }, [path]);

    useEffect(() => {
        textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }, [command]);

    function correctСursorPosition() {
        if (textareaRef.current.selectionStart < path.length) {
            setСursor(textareaRef, path.length)
        }
    }

    function handleInput(e) {
        if (e.target.value.substring(0, path.length) === path) {
            setCommand(e.target.value.substring(path.length, e.target.value.length))
        } else {
            setCommand("")
        }
    }

    function handleKeyDown(p) {
        correctСursorPosition(p)
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
        if (!editableTextarea) return
        setCommand(getCommandByReverseIndex(newReverseCommandIndex))
        setReverseCommandIndex(newReverseCommandIndex)
    }

    function handleEnter(p) {
        p.preventDefault()
        if (command.trim().length > 0) {
            addLine(path, command)
            setCommand(defaultCommandValue)
            processСommand()
        }
    }

    async function processСommand() {
        setEditableTextarea(false)

        const trimmedCommand = command.trim()
        if (isCdCommand(trimmedCommand)) {
            doCdCommand(trimmedCommand, path, setPath)
        } else if (isSayHelloCommand(trimmedCommand)) {
            doSayHelloCommand(printAnswer)
        } else {
            await printAnswer("The command was not recognized!")
        }

        setEditableTextarea(true)
    }

    async function printAnswer(answerPhrase) {
        for (let i = 0; i <= answerPhrase.length; i++) {
            await sleep(50)
            setAnswerToLastLine(answerPhrase.substring(0, i))
        }
    }

    return (
        <StyledTextarea key={path} themeColors={themeColors} ref={textareaRef}
                        value={(editableTextarea ? path : "") + command} readOnly={!editableTextarea}
                        onChange={handleInput} onKeyDown={handleKeyDown}
                        onKeyUp={correctСursorPosition} onMouseUp={correctСursorPosition}/>
    )
}

function setСursor(textareaRef, pathLength) {
    textareaRef.current.focus();
    textareaRef.current.setSelectionRange(pathLength, pathLength);
}
