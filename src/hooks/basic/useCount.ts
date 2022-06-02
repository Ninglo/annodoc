import { useCallback, useState } from "react"

export const useCount = () => {
    const [count, setC] = useState(0)
    const add = useCallback(() => {
        setC(c => c + 1)
    }, [])

    return { count, add }
}