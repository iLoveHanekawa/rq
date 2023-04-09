import { useInfiniteQuery } from "@tanstack/react-query"
import { Color } from "./Paginated.page"

export default function Infinite() {

    const { data, error, isLoading, hasNextPage, fetchNextPage, isFetching, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['colors'],
        queryFn: async ( { pageParam = 1 } ): Promise<Color[]> => {
            try {
                const res = await fetch(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`)
                return res.json()
            } catch (error) {
                throw new Error('Could not fetch!')
            }
        },
        getNextPageParam: (lastPage, pages) => {
            if(pages.length < 4) {
                return pages.length + 1
            }
            else return undefined
        }   
    })

    if(error instanceof Error) return <div>{error.message}</div>
    else if(isLoading) return <div>Loading...</div>

    return <div>
        <ul>
            {data?.pages.map(page => {
                return page.map((color, id) => <li key = {id}>
                    <div>{color.id}</div>
                    <div>{color.label}</div>
                </li>)
            })}
        </ul>
        { hasNextPage && <button onClick = {() => {
            fetchNextPage()
        }}>Load more.</button> }
        <div>{isFetching && !isFetchingNextPage? 'Fetching...': null}</div>
    </div>
}