import React from 'react'
import { Card, Avatar } from 'antd';
import { HeartOutlined, HeartFilled, UserOutlined } from '@ant-design/icons';

function Post({post}){
  
  const { caption, location, photo} = post;

  return (
  <div>
    <Card
      cover={
      <img src={photo} alt={caption}/>
      }
      actions={[<HeartOutlined/>]}
    >
      <Card.Meta avatar={<Avatar size="large" icon={<UserOutlined/>}/>} title={location} description={caption}/>
    </Card>
    {/* {caption}
    {location} */}
        </div>);

}

export default Post;