import { useEffect, useState } from "react";
import {useQuery, useQueryClient} from '@tanstack/react-query';

import PostDetail from "./PostDetail";

const maxPostPage = 10;


async function fetchPosts(pageNum) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNum}`);

  return response.json();
}

function Posts() {

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);
  
  const queryClient = useQueryClient();

  useEffect(()=>{
    if(currentPage < maxPostPage){
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery(['post', nextPage], ()=> fetchPosts(nextPage))
    }
  },[currentPage, queryClient]);

  const {data , isError, error, isLoading} = useQuery(['post', currentPage],()=>fetchPosts(currentPage), {
    staleTime:2000,
    keepPreviousData:true
  })

  console.log(data);

  if(isLoading) return <h3>Loading... ... </h3>;
  
  if(isError) 
    return (
      <>
        <h3>Oops, something went wrong</h3>
        <p>{error.toString()}</p>
      </>
  )

  return (
    <>
      <ul>
        {
          data.map((post) => (
            <li key={post.id} className="post-title" onClick={()=>setSelectedPost(post)}>{post.title}</li>
          ))
        }
      </ul>
      <div className="pages">
        <button disabled={currentPage <= 1} onClick={()=>setCurrentPage((prev) => prev -1)}>Previous page</button>
        <span>Page is {currentPage}</span>
        <button disabled={currentPage >= maxPostPage} onClick={()=> setCurrentPage((prev) => prev + 1)}>
          Next Page
        </button>
      </div>
      <hr/>
      {selectedPost && <PostDetail post={selectedPost}/>}
    </>
  )
}

export default Posts