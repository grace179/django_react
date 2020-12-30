import React from 'react'
import { Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './Suggestion.scss';

function Suggestion() {
  return (
    <div className="suggestion">
      <div className="avartar">
        <UserOutlined/>
      </div>
      <div className="username">Username</div>
      <div className="action">
        <Button size="small">Follow</Button>
      </div>
    </div>
  )
}

export default Suggestion;