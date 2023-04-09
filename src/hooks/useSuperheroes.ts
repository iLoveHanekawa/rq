import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
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

const addHero = async (hero: { name: string, alterEgo: string }): Promise<HeroType> => {
    try {
        const res = await fetch('http://localhost:4000/superheroes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(hero)
        })
        return res.json()
    } catch (error) {
        throw new Error("Post failed")
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

export const useAddSuperHeroData = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: addHero,
        // onSuccess: () => {
        //     queryClient.invalidateQueries(['superheroes'])
        // }
        onSuccess: (data) => {
            queryClient.setQueriesData<HeroType[]>(['superheroes'], (prev) => {
                return [...prev as HeroType[], data]
            })
        }
    })
}