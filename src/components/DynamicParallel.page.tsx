import { HeroType } from "./Superhero.page"
import { useQueries } from '@tanstack/react-query'

type DynamicParallelProps = {
    heroIds: number[]
}

const fetchHero = async (heroId: number): Promise<HeroType> => {
    try {
        const res = await fetch(`http://localhost:4000/superheroes/${heroId}`)
        return res.json()
    } catch (error) {
        throw new Error('Failed to fetch')
    }
}

export default function DynamicParallelPage({ heroIds }: DynamicParallelProps) {

    const {} = useQueries({
        queries: heroIds.map((id, i) => {
            return {
                queryKey: ['super-heroes', id],
                queryFn: () => { return fetchHero(id) }
            }
        })
    })

    return <div></div>
}