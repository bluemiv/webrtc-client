import React, { useEffect } from 'react';
import { io } from 'socket.io-client';
import { Button, Modal } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { useCallStatusChatStore, useSocketChatStore } from '@/store';
import { ROUTE_PATH, SOCKET_EVENTS_NAME } from '@/constants';

function App() {
  const { socket, setSocket } = useSocketChatStore();
  const { callStatus, setCallStatus } = useCallStatusChatStore();
  const nav = useNavigate();

  const msgServer = process.env.REACT_APP_MSG_SERVER_HOST;

  useEffect(() => {
    if (!msgServer) return;
    if (!!socket) return;

    initSocket();
  }, []);

  const initSocket = () => {
    const newSocket = io(msgServer as string);
    setSocket(newSocket);
  };

  const onCloseCallModal = () => {
    socket?.emit(SOCKET_EVENTS_NAME.CALL_REJECT);
    setCallStatus({ status: 'reject', receiveModalOpen: false, sendModalOpen: false });
  };

  const onClickApprove = () => {
    socket?.emit(SOCKET_EVENTS_NAME.CALL_APPROVE);
    setCallStatus({ status: 'approve', receiveModalOpen: false, sendModalOpen: false });
    nav(ROUTE_PATH.CHAT);
  };

  return (
    <>
      <Outlet />
      {callStatus.receiveModalOpen && (
        <Modal
          title="화상 통화 요청"
          open={callStatus.receiveModalOpen}
          onCancel={onCloseCallModal}
          footer={
            <>
              <Button danger type="primary" onClick={onCloseCallModal}>
                거절
              </Button>
              <Button type="primary" onClick={onClickApprove}>
                승낙
              </Button>
            </>
          }
        >
          화상통화 요청이 왔습니다.
        </Modal>
      )}
    </>
  );
}

export default App;
