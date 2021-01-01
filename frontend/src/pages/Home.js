import { Button } from 'antd';
import React from 'react'
import { useHistory } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import PostList from '../components/PostList'
import StoryList from '../components/StoryList';
import SuggestionList from '../components/SuggestionList';

function Home() {
  const history = useHistory();
  const handleClick = () => {
    history.push("/posts/new");
  };

  const sidebar = (
    <>
      <Button block 
        style={{marginBottom:'1rem'}}
        onClick={handleClick}
        >새 포스팅 쓰기</Button>
      <StoryList/>
      <SuggestionList/>
    </>
  );

  return (
    <AppLayout sidebar={sidebar}>
      <PostList/>
    </AppLayout>
  )
}

export default Home;