import React from 'react';
import { useParams } from 'react-router-dom';

const ChatPage = () => {
  const params = useParams();
  const { room } = params;

  return <div>{room}</div>;
};

export default ChatPage;
