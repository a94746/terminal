import {useRef, useState} from "react";
import {lastCharOfTerminal} from "./Textarea.jsx";

export default function useTextarea(defaultCommandValue) {
    const ref = useRef(null);
    const [path, setPath] = useState('C:\\users' + lastCharOfTerminal)
    const [command, setCommand] = useState(defaultCommandValue)
    const [editable, setEditable] = useState(true)

    function handleInput(e) {
        if (e.target.value.substring(0, path.length) === path) {
            setCommand(e.target.value.substring(path.length, e.target.value.length))
        } else {
            setCommand("")
        }
    }

    return {
        bind: {value: (editable ? (path + command) : ""),
            onChange: handleInput,
            ref: ref,
            readOnly: !editable},
        path,
        command,
        ref,
        editable,
        setCommand,
        setPath,
        setEditable
    }
}