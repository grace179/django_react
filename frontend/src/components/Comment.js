import React from 'react';
import moment from 'moment';

import { Avatar, Button, Comment as AntdComment, Tooltip } from 'antd';

function Comment({ comment }) {
  const { author: { username, name, avatar_url }, message, created_at} = comment;
  const displayName =name.length === 0 ? username : name ;
  
  return (
    <>
      <AntdComment
        author={displayName}
        avatar={
          <Avatar
            src={avatar_url}
            alt={displayName}
          />
        }
        content={
          <p>
            {message}
          </p>
        }
        datetime={
          <Tooltip title={moment().format(created_at)}>
            <span>{moment(created_at).fromNow()}</span>
          </Tooltip>
        }
      />
    </>
  );
}

export default Comment;