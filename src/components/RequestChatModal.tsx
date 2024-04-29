import React, { useEffect } from 'react';
import { Button, Modal } from 'antd';
import { ROUTE_PATH, SOCKET_EVENTS_NAME } from '@/constants';
import { useCallStatusChatStore, useSocketChatStore } from '@/store';
import { useNavigate } from 'react-router-dom';

const RequestChatModal = () => {
  const { socket } = useSocketChatStore();
  const { callStatus, setCallStatus } = useCallStatusChatStore();
  const nav = useNavigate();

  useEffect(() => {
    if (callStatus.status === 'approve') {
      setCallStatus({ status: 'reject', receiveModalOpen: false, sendModalOpen: false });
      nav(ROUTE_PATH.CHAT);
    }
  }, [callStatus]);

  const onCloseModal = () => {
    setCallStatus({ status: 'reject', receiveModalOpen: false, sendModalOpen: false });
    socket?.emit(SOCKET_EVENTS_NAME.CALL_REJECT);
  };

  return (
    <Modal
      title="영상통화 요청"
      open={callStatus.sendModalOpen}
      onCancel={onCloseModal}
      footer={
        <>
          <Button onClick={onCloseModal}>닫기</Button>
        </>
      }
    >
      영상통화 요청 중 입니다. 잠시만 기다려주세요.
    </Modal>
  );
};

export default RequestChatModal;
