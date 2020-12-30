import React from 'react';
import './SuggestionList.scss';
import { Card } from 'antd';
import Suggestion from './Suggestion';

function SuggestionList() {
  return (
    <Card title="suggestion for you" size="small">
      <Suggestion/>
      <Suggestion/>
      <Suggestion/>

    </Card>
  )
}

export default SuggestionList;
