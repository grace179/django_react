import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Post from './Post';
import { useAppContext } from '../store';

const apiUrl = "http://localhost:8000/api/posts/";

function PostList(){
  const { store : {jwtToken}} = useAppContext();
  const [postList, setpostList] = useState([]);

  useEffect(()=>{
    Axios.get(apiUrl)
      .then(response => {
        const {data} = response;
        console.log("loaded response", response);
        setpostList(data);
      })
      .catch(error => {
        // error.response;
      })

    console.log("mounted");
  },[])

  return(
    <div>
      {/* <h1>PostList</h1> */}
      {
        postList.map(post => {
          return <Post post={post} key={post.id}/>
        })
      }
    </div>
  )
}

export default PostList;