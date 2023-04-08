import { useQuery } from "@tanstack/react-query"
import { HeroType } from "../components/Superhero.page"

const fetchData: () => Promise<HeroType[]> = async () => {
    try {
        const res = await fetch('http://localhost:4000/superheroes')
        if(!res.ok) return Promise.reject('Whoops!')
        return res.json() as Promise<HeroType[]>
        
    } catch (error) {
        throw new Error('Whoops!')
    }
}

export const useSuperhero = (onSuccess: () => void, onError: () => void) => {
    return useQuery({
        queryKey: ['superheroes'],
        queryFn: fetchData,
        onSuccess: () => onSuccess,
        onError: () => onError
    })
}