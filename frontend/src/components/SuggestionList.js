import React, { useEffect, useState } from 'react';
import './SuggestionList.scss';
import { Card } from 'antd';
import Suggestion from './Suggestion';
import { axiosInstance, useAxios } from '../api';
import { useAppContext } from '../store';

function SuggestionList() {
  const { store: { jwtToken }} = useAppContext();

  const [userList, setUserList] = useState([]);

  const headers = { Authorization: `JWT ${jwtToken}`};

  const [{ data: originUserList, loading, error }, refetch] = useAxios({
    url:"/accounts/suggestions/",
    headers,
  });

  useEffect(() => {
    if( !originUserList) 
      setUserList([]);
    else setUserList(originUserList.map(user => ({...user, is_follow: false})));
  },[originUserList]);

  const onFollowUser = username => {
    const data = { username };
    const config = { headers }
    axiosInstance.post("/accounts/follow/", data, config)
      .then(response => {
        setUserList(prevUserList => 
          prevUserList.map(user => 
            (user.username !== username) ? user : {...user, is_follow: true}
          )
        );

      })
      .catch(error => {
        console.log("error: ", error);
      });
    
  };

  return (
    <>
    { loading && <div>Loading...</div>}
    { error && <div>에러가 발생했습니다.</div>}

    <button onClick={() => refetch()}>Reload</button>
    <Card title="suggestion for you" size="small">
      {
        userList.map(suggestionUser => (
          <Suggestion 
          key={suggestionUser.username}
          suggestionUser={suggestionUser}
          onFollowUser={onFollowUser}
          />
      ))}
      
    </Card>
    </>
  )
}

export default SuggestionList;
