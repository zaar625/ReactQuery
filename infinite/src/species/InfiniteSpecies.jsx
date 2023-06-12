import InfiniteScroll from 'react-infinite-scroller'; 
import {useInfiniteQuery} from '@tanstack/react-query'

import Species from './Species';

function InfiniteSpecies() {

    const initialUrl = "https://swapi.dev/api/species";

    const fetchUrl = async(url) => {
        const response = await fetch(url);
        return response.json();
    }

    const {data, isLoading, isError, error, isFetching, fetchNextPage, hasNextPage} = useInfiniteQuery(['sw-species'],({pageParam = initialUrl}) => fetchUrl(pageParam),{
        getNextPageParam:(lastPage) => lastPage.next || undefined
    })

    console.log(data)
    if(isLoading) return <div className='loading'>Loading...</div>
    if(isError) return <div>Error! {error.toString()}</div>

  return (
    <>
        {isFetching && <div className="loading">Loading...</div>}
        <InfiniteScroll hasMore={hasNextPage} loadMore={fetchNextPage}>
            {data.pages.map((pageData)=> {
                return pageData.results.map((species)=> {
                    return <Species key={species.name} name={species.name} language={species.language} averageLifespan={species.average_lifespan}/>
                })
            })}
        </InfiniteScroll>
    </>
  )
}

export default InfiniteSpecies