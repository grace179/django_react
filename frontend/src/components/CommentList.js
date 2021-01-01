import React, { useState } from 'react';
import useAxios from 'axios-hooks';
import Axios from 'axios';
import { useAppContext } from '../store';

import { Avatar, Button, Input, Tooltip } from 'antd';
import Comment from './Comment';

function CommentList({ post }) {
  const { store: {jwtToken}} = useAppContext();

  const [commentContent, setCommentContent] = useState("");
  const headers = { Authorization: `JWT ${jwtToken}` };
  
  const [{ data: commentList, loading, error }, refetch] = useAxios({
    url: `http://localhost:8000/api/posts/${post.id}/comments/`,
    headers,
  });

  const handleCommentSave = async () => {
    const apiUrl = `http://localhost:8000/api/posts/${post.id}/comments/`;
    console.log("handleCommentSave : ", commentContent);

    try{
      const response = await Axios.post(apiUrl, { message: commentContent }, { headers });
      console.log(response);
      setCommentContent("");
      refetch();
    }catch(error){
      console.log(error);
    }
  };

  return (
    <div>
      {/* {JSON.stringify(commentList)} */}
      {commentList && commentList.map(comment => (
        <Comment 
        key={comment.id}
        comment={comment}/>
      ))}

      <Input.TextArea 
        style={{marginBottom:"0.5em"}}
        value={commentContent}
        onChange={e => setCommentContent(e.target.value)}
      />
      <Button block type="primary"
        disabled={commentContent.length === 0}
        onClick={handleCommentSave}
        >댓글 쓰기
      </Button>
    </div>
  );
}

export default CommentList;