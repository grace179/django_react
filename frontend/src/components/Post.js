import React from 'react'
import { Card, Avatar, Comment, Tooltip } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import CommentList from './CommentList';

function Post({ post, handleLike }){
  const { author, caption, location, photo, tag_set, is_like } = post;
  const {username, name, avatar_url} = author;


  return (
  <div>
    <Card
      hoverable
      cover={
      <img src={photo} alt={caption}/>}
      actions={[
        is_like ? (
          <HeartFilled style={{color:"#f593c8"}}
            onClick={() => handleLike({post, isLike: false})}/>
            ) : (
          <HeartOutlined onClick={() => handleLike({post, isLike: true})}/>)
    ]}
    >
    <Card.Meta 
      avatar={<Avatar size="large" 
      icon={
        <img src={`http://localhost:8000`+avatar_url} alt={username}/>}
        />} 
      title={location} 
      description={caption}
    />
    {/* <h2>Comment List</h2>
    {JSON.stringify(commentList)} */}
    <CommentList post={post}/>
    </Card>
    {/* {caption}
    {location} */}
        </div>);

}

export default Post;