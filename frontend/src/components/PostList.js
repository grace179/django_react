import React, { useEffect, useState } from 'react';
import { axiosInstance, useAxios } from '../api';
import Post from './Post';
import { useAppContext } from '../store';
import { Alert } from 'antd';

function PostList(){
  const { 
    store : {jwtToken}, 
    // dispatch 
  } = useAppContext();

  const [postList, setPostList] = useState([]);
  
  const headers = { Authorization: `JWT ${jwtToken}` };

  const [{ data: originPosttList, loading, error }, refetch] = useAxios({
    url:"/api/posts/",
    headers,
  });

  useEffect(() => {
    setPostList(originPosttList);
  },[originPosttList])

  const handleLike = async ({ post, isLike }) => {
    const apiUrl = `/api/posts/${post.id}/like/`;
    const method = isLike ? "POST" : "DELETE";

    try{
      const response = await axiosInstance({
        url: apiUrl,
        method,
        headers,
      });
      console.log("response: " , response);

      setPostList(prevList => {
        return prevList.map(currentPost => 
          currentPost === post ? {...currentPost, is_like:isLike} : currentPost);
      });

    }catch(error){
      console.log("error: ", error);
    }

    console.group("handleLike : ");
    console.log(post);
    console.log(isLike);
    console.groupEnd();
  };

  return(
    <div>
      { postList && postList.length === 0 && (
        <Alert type="warning" message="포스팅이 없습니다."/>
        )}
      {postList && postList.map(post =>
        <Post 
          post={post} key={post.id}
          handleLike={handleLike}
          />
        )}
    </div>
  );
}

export default PostList;