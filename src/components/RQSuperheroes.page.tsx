import { useSuperhero, useAddSuperHeroData } from "../hooks/useSuperheroes"
import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'

export default function RQSuperheroesPage() {
    
    const onSuccess = () => {
        console.log('Data fetched')
    }
    const onError = () => {
        console.log('Error occurred')
    }
    
    const [hero, setHero] = useState({ name: '', alterEgo: ''})
    const { mutate } = useAddSuperHeroData()
    const { data, error, isLoading } = useSuperhero(onSuccess, onError)    

    if(isLoading) return <div>Loading...</div>
    else if(error instanceof Error) return <div>{error.message}</div>
    
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        mutate(hero)
    }

    return <div>
        <form onSubmit = {handleSubmit}>    
            <input className = 'border-2 border-gray-300 mt-1 rounded-md ml-1' value = {hero.name} onChange = {event => {
                setHero({ name: event.currentTarget.value, alterEgo: hero.alterEgo })
            }} />
            <input className = 'border-2 border-gray-300 mt-1 rounded-md ml-1' value = {hero.alterEgo} onChange = {event => {
                setHero({ name: hero.name, alterEgo: event.currentTarget.value })
            }} />
            <button>Add Hero</button>
        </form>
        <ul>
            {data?.map((val, index) => {
                return <li className = 'text-gray-600' key = {index}>
                    <Link to={`${val.id}`}>{val.name}</Link>
                    <br />
                </li>
            })}
        </ul>
    </div>
}