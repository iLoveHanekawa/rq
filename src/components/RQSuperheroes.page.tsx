import { useSuperhero } from "../hooks/useSuperheroes"

export default function RQSuperheroesPage() {
    const onSuccess = () => {
        console.log('Data fetched')
    }
    const onError = () => {
        console.log('Error occurred')
    }

    const { data, error, isLoading, isFetching } = useSuperhero(onSuccess, onError)

    console.log({ isLoading, isFetching })

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