export const isSayHelloCommand = (command) => command.substring(0, 9) === "say hello"

export default function doSayHelloCommand(printAnswer) {
    printAnswer("Hello dear user!")
}