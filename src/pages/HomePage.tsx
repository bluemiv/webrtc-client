import React, { useEffect } from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@/constants';

const HomePage = () => {
  const nav = useNavigate();

  useEffect(() => {}, []);

  return (
    <div className="flex items-center justify-center h-full">
      <Button type="primary" onClick={() => nav(ROUTE_PATH.CHAT.replace(':room', 'test-room'))}>
        방 들어가기
      </Button>
    </div>
  );
};

export default HomePage;
