import { useQuery } from "@tanstack/react-query"
import { HeroType } from "./Superhero.page"

export default function RQSuperheroesPage() {

    const fetchData: () => Promise<HeroType[]> = async () => {
        try {
            const res = await fetch('http://localhost:4000/superheroes')
            if(!res.ok) return Promise.reject('Whoops!')
            return res.json() as Promise<HeroType[]>
            
        } catch (error) {
            throw new Error('Whoops!')
        }
    }

    const { data, error, isLoading } = useQuery({
        queryKey: ['superheroes'],
        queryFn: fetchData
    })

    if(isLoading) return <div>Loading...</div>
    else if(error instanceof Error) return <div>{error.message}</div>

    return <ul>
        {data?.map((val, index) => {
            return <li key = {index}>
                <div>{val.id}</div>
                <div>{val.name}</div>
                <div>{val.alterEgo}</div>
                <br />
            </li>
        })}
    </ul>
}