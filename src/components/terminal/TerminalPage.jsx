import Textarea from "./Textarea.jsx";
import Line from "./Line.jsx";
import useLines from "./useLines.js";

export default function TerminalPage() {
    const lines = useLines()

    function getCommandByReverseIndex(reverseIndex) {
        return reverseIndex === 0 || reverseIndex > lines.value.length
            ? ""
            : lines.value[lines.value.length - reverseIndex].command
    }

    return (
        <div>
            {lines.value.map(l =>
                <div key={l.id} style={{marginBottom: '1rem'}}>
                    <Line>{l.path}{l.command}</Line>
                    <Line>{l.answer}</Line>
                </div>
            )}
            <Textarea {...lines.bind} getCommandByReverseIndex={getCommandByReverseIndex}/>
        </div>
    )
}