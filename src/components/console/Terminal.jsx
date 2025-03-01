import Textarea from "./Textarea.jsx";
import {useState} from "react";
import Line from "./Line.jsx";

export default function Terminal({themeColors}) {
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

    function getCommandByReverseIndex(reverseIndex) {
        return reverseIndex === 0 || reverseIndex > lines.length
            ? ""
            : lines[lines.length - reverseIndex].command
    }

    function getLinesLength() {
        return lines.length
    }

    return (
        <div>
            {lines.map(l =>
                <div key={l.id} style={{marginBottom: '1rem'}}>
                    <Line themeColors={themeColors}>{l.path}{l.command}</Line>
                    <Line themeColors={themeColors}>{l.answer}</Line>
                </div>
            )}
            <Textarea themeColors={themeColors} addLine={addLine} setAnswerToLastLine={setAnswerToLastLine}
                      getCommandByReverseIndex={getCommandByReverseIndex} getLinesLength={getLinesLength}/>
        </div>
    )
}