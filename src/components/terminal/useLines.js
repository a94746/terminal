import {useState} from "react";

export default function useLines() {
    const [lines, setLines] = useState([])

    function setAnswerToLastLine(answer) {
        setLines(prev =>
            prev.map(line =>
                line.id === (prev.length - 1)
                    ? {...line, answer: answer}
                    : line
            )
        )
    }

    function addLine(path, command) {
        const line = {id: lines.length, path: path, command: command}
        setLines([...lines, line])
    }

    function getLinesLength() {
        return lines.length
    }

    return {
        bind: {
            addLine,
            setAnswerToLastLine,
            getLinesLength
        },
        value: lines
    }
}