import { useQuery } from "@tanstack/react-query";
import { HeroType } from "../components/Superhero.page";

export default function useSuperheroData(heroId: string) {

    const fetchHeroData = async (): Promise<HeroType> => {
        try {
            const res = await fetch(`http://localhost:4000/superheroes/${heroId}`)
            return res.json() as Promise<HeroType>
        } catch (error) {
            throw new Error('Could\'nt fetch Hero Data!')
        }
    }

    return useQuery({
        queryKey: ['super-hero', heroId],
        queryFn: fetchHeroData
    })
}