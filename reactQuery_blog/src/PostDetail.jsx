import {useMutation, useQuery} from '@tanstack/react-query';
import {useEffect} from 'react';
import PropTypes from 'prop-types'


async function fetchComments(postId){
  const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);

  return response.json();
}

async function deletePost(postId){
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId=${postId}`,
    {method:'DELETE'}
  )

  return response.json();
}

async function updatePost(postId){
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId=${postId}`,
    {method:'PATCH', data:{title:'REACT QUERY FOREVER'}}
  )

  return response.json();
}

function PostDetail({post}) {
const { data, isLoading, isError, error} = useQuery(['comments',post.id],()=>fetchComments(post.id),{cacheTime:1000})

const deleteMutation = useMutation((postId)=>deletePost(postId));
const updateMutation = useMutation((postId)=> updatePost(postId));

useEffect(()=> {
  updateMutation.reset();
  deleteMutation.reset();
},[post.id]);

if(isLoading){
  return <h3>Loading...</h3>
}

if(isError) {
  return (
    <>
      <h3>Erorr</h3>
      <p>{error.toString}</p>
    </>
  )
}

  return (
    <>
      <h3 style={{color:'blue'}}>{post.title}</h3>
      <button onClick={()=>deleteMutation.mutate(post.id)}>DELETE</button>
      <button onClick={()=>updateMutation.mutate(post.id)}>UPDATE TITLE</button>
      {deleteMutation.isError && (<p style={{color:'red'}}>Error deleting the post</p>)}
      {deleteMutation.isLoading && (<p style={{color:'purlpe'}}>Deleting  the post</p>)}
      {deleteMutation.isSuccess && (<p style={{color:'red'}}>post has (not) been deleted</p>)}
      {updateMutation.isError && (<p style={{color:'red'}}>Error update the post</p>)}
      {updateMutation.isLoading && (<p style={{color:'purlpe'}}>updating  the post</p>)}
      {updateMutation.isSuccess && (<p style={{color:'red'}}>post has (not) been update</p>)}
      
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment)=> (
        <li key={comment.id}>
          {comment.email} : {comment.body}
        </li>
      ))}
    </>
  )
}

PostDetail.propTypes = {
  post: {
    id: PropTypes.number.isRequired
  }
};

export default PostDetail