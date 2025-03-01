import { useEffect, useState } from "react"


export default function Time() {
    const [time, setTime] = useState(new Date())
    useEffect(() => {
        setInterval(() => setTime(new Date()), 1000)
        }
        , []
    )
    return (
        <p>{getPrettyTime(time)}</p>
    )
}

function getPrettyTime(time) {
    function getTwoDigits(num) {
        return num < 10 ? '0' + num : num
    }

    return getTwoDigits(time.getHours())
        + ":" + getTwoDigits(time.getMinutes())
        + ":" + getTwoDigits(time.getSeconds())
}