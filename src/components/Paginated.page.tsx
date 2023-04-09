import { useQuery } from "@tanstack/react-query"
import { useState } from 'react'
export type Color = {
    id: number,
    label: string
}

export default function Paginated() {

    const [pageNumber, setPageNumber] = useState(1)

    const fetchColors = async (pageNumber: number): Promise<Color[]> => {
        try {
            const res = await fetch(`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`)
            return res.json()
        } catch (error) {
            throw new Error('Colors not fetched')
        }
    }

    const { data, error, isLoading } = useQuery({
        queryKey: ['colors', pageNumber],
        queryFn: () => fetchColors(pageNumber),
        keepPreviousData: true
    })

    if(error instanceof Error) return <div>{error.message}</div>
    else if(isLoading) return <div>Loading...</div>

    return <div>    
        <ul>
            {data?.map((color, i) => {
                return <li key = {i}>
                    <div>{color.id}</div>
                    <div>{color.label}</div>
                </li>
            })}
        </ul> 
        <button onClick = {() => {
            setPageNumber(i => Math.max(1, i - 1))
        }}>Prev</button>
        <button onClick={() => {
            setPageNumber(i => Math.min(4, i + 1))
        }}>Next</button>
    </div>
}