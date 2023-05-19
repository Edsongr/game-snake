import { useEffect, useLayoutEffect, useRef } from "react"

function UseInterval(callback: () => void, delay: number | null) {

    const savedCall = useRef(callback)

    useLayoutEffect(() => {
        savedCall.current = callback
    }, [callback])

    useEffect(()=> {

        if (!delay && delay !== 0)
            return 

        const id = setInterval(() => savedCall.current(), delay)

        return () => clearInterval(id);

    }, [delay])

}

export default UseInterval