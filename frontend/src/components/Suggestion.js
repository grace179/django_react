import React from 'react'
import { Avatar,Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './Suggestion.scss';

function Suggestion({suggestionUser, onFollowUser}) {

  const { username, name, avatar_url, is_follow } = suggestionUser;
  
  return (
    <div className="suggestion">
      <div className="avartar">
        <Avatar
          size="small"
          icon={
          <img 
            src={avatar_url} 
            alt={`${username}'s profile`}
          />
          }
        />
        {/* <UserOutlined/> */}
      </div>
      <div className="username">{name.length === 0 ? username : name}</div>
      <div className="action">
        {is_follow && "팔로잉 중"}
        {!is_follow && (
          <Button size="small"
            onClick={()=>onFollowUser(username)}>Follow</Button>)}
        
      </div>
    </div>
  )
}

export default Suggestion;