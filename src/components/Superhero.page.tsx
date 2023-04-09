import { useEffect, useState } from 'react'

export type HeroType = {
    id: number
    name: string
    alterEgo: string
}

export default function SuperheroPage() {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [data, setData] = useState<HeroType[]>([])
    useEffect(() => {
        const getData = async () => {
            const res = await fetch('http://localhost:4000/superheroes')
            const heroes: HeroType[] = await res.json()
            setData(heroes)
            setIsLoading(false)
        }
        getData()
    }, [])

    if(isLoading) return <div>Loading...</div>
    return <ul>
        {data.map(( hero, i ) => {
            return <li className = 'text-gray-600' key = {i}>
                <div>{hero.name}</div>
                <br/>
            </li>
        })}
    </ul>
}
