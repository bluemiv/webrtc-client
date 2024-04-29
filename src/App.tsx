import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useRTCPCChatStore, useSocketChatStore } from '@/store';
import { io } from 'socket.io-client';

function App() {
  const { socket, setSocket } = useSocketChatStore();
  const { pc, setPC } = useRTCPCChatStore();

  const msgServer = process.env.REACT_APP_MSG_SERVER_HOST;

  useEffect(() => {
    if (!msgServer) return;

    if (!socket) {
      initSocket();
    }
  }, []);

  const initRTCPeerConnection = (
    iceServers: {
      urls: string;
      username?: string;
      credential?: string;
    }[],
  ) => {
    const pc = new RTCPeerConnection({
      iceServers,
    });
    setPC(pc);
  };

  const initSocket = () => {
    const socket = io(msgServer as string);
    setSocket(socket);
    socket.on('iceServers', (data) => {
      const { stun, turn } = data?.servers || {};
      initRTCPeerConnection([...stun, ...turn]);
    });
    if (!pc) {
      socket.emit('iceServers');
    }
  };

  return <Outlet />;
}

export default App;
