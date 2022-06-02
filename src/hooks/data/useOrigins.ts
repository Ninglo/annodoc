import { useEffect, useState } from "react"
import { getOrigins, GetOriginsProps, Origin } from "../../modal/origin"

export const useOrigins = (defaultQuery: GetOriginsProps) => {
    const [query, setQuery] = useState(defaultQuery)
    const [origins, setOrigins] = useState<Origin[]>([])

    useEffect(() => {
        getOrigins(query).then(res => {
            setOrigins(res ?? [])
        })
    }, [query])

    return { origins, query, setQuery } as const
}
