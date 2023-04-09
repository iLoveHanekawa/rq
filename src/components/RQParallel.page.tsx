import { useQuery } from "@tanstack/react-query"
import { HeroType } from "./Superhero.page"

export type FriendType = {
    id: number,
    name: string
}

export default function RQParallel () {

    const getHeroes = async (): Promise<HeroType[]> => {
        try {
            const res = await fetch('http://localhost:4000/superheroes')
            return res.json() as Promise<HeroType[]>
        } catch (error) {
            throw new Error('Could\'nt fetch')
        }
    }

    const getFriends = async (): Promise<FriendType[]> => {
        try {
            const res = await fetch('http://localhost:4000/friends')
            return res.json() as Promise<FriendType[]>
        } catch (error) {
            throw new Error('Could\'nt fetch')
        }
    }

    const { data: superheroData} = useQuery({
        queryKey: ['super-heroes'],
        queryFn: getHeroes
    })

    const { data: friendsData} = useQuery({
        queryKey: ['friends'],
        queryFn: getFriends
    })

    return <div>
        <ul>
            {superheroData?.map((hero, i) => {
                return <li key = {i}>
                    <div>{hero.id}</div>
                    <div>{hero.name}</div>
                    <div>{hero.alterEgo}</div>
                </li>
            })}
        </ul>
        <ul>
            {friendsData?.map((friend, i) => {
                return <li key = {i}>
                    <div>{friend.id}</div>
                    <div>{friend.name}</div>
                </li>
            })}
        </ul>
    </div>
}