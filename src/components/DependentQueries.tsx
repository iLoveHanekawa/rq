import { useQuery } from "@tanstack/react-query"

type DependentQueriesProps = {
    email: string
}

type User = {
    id: string
    channelId: string
}

type Channel = {
    id: string,
    courses: string[]
}

export default function DependentQueries({ email }: DependentQueriesProps) {

    const fetchUser = async (email: string): Promise<User> => {
        try {
            const res = await fetch(`http://localhost:4000/users/${email}`)     
            return res.json()       
        } catch (error) {
            throw new Error('Whoops, cannot get the user.')
        }
    }

    const fetchCourses = async (channelId: string | undefined): Promise<Channel> => {
        try {
            const res = await fetch(`http://localhost:4000/channels/${channelId}`)
            return res.json()
        } catch (error) {
            throw new Error('Something went horribly wrong.')
        }
    }

    const { data: user } = useQuery({
        queryKey: ['user', email],
        queryFn: () => fetchUser(email)
    })

    const channelId = user?.channelId

    const { data: channel } = useQuery({
        queryKey: ['channel', channelId],
        queryFn: () => { return fetchCourses(channelId) },
        enabled: !!channelId
    })

    return <div></div> 
}