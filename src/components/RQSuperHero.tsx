import useSuperheroData from "../hooks/useSuperheroData"
import { useSuperhero } from "../hooks/useSuperheroes"
import { useParams } from "react-router-dom"

export default function RQSuperHero() {
    
    const params = useParams<{ heroId: string }>()
    const { data, error, isLoading, isError } = useSuperheroData(params.heroId as string)
    if(isLoading) return <div>Loading...</div>
    else if(error instanceof Error) return <div>{error.message}</div>

    return <div>
        <div>{data?.id}</div>
        <div>{data?.name}</div>
        <div>{data?.alterEgo}</div>
    </div>
}