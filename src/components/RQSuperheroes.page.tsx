import { useSuperhero } from "../hooks/useSuperheroes"
import { useState } from 'react'
import { Link } from 'react-router-dom'

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
            return <li className = 'text-gray-600' key = {index}>
                <Link to={`${val.id}`}>{val.name}</Link>
                <br />
            </li>
        })}
    </ul>
}