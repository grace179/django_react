import React from 'react'
import { Card, Avatar } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';

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
          <HeartFilled FiilColor="pink"
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
    </Card>
    {/* {caption}
    {location} */}
        </div>);

}

export default Post;