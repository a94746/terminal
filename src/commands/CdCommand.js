import {lastCharOfTerminal} from "../components/terminal/Textarea.jsx";

export const isCdCommand = (command) => command.substring(0, 3) === "cd "

export default function doCdCommand(command, path, setPath) {
    let newPath
    if (command.substring(3, 5) == "..") {
        newPath = path.substring(0, path.lastIndexOf("\\")) + lastCharOfTerminal;
        if (newPath.length <= 5) {
            newPath = 'C:\\' + lastCharOfTerminal
        }
    } else {
        newPath = path.substring(0, path.length - 1) +
            (path.substring(path.length - 2, path.length -1) == "\\" ? "" : "\\")
            + command.substring(3, command.length)
            + lastCharOfTerminal
    }
    setPath(newPath)
}