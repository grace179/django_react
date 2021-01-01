import { Card } from 'antd';
import React from 'react'
import PostNewForm from '../components/PostNewForm'
import './PostNew.scss';

function PostNew() {
  return (
    <div className="PostNew">
      <Card title="새 포스팅">
        <PostNewForm/> 
      </Card>
    </div>
  );
}

export default PostNew
