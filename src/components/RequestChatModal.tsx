import React, { useEffect } from 'react';
import { Button, Modal } from 'antd';
import { ROUTE_PATH, SOCKET_EVENTS_NAME } from '@/constants';
import { useCallStatusChatStore, useSocketChatStore } from '@/store';
import { useNavigate } from 'react-router-dom';

const RequestChatModal = () => {
  const { socket } = useSocketChatStore();
  const { chatState, setChatState } = useCallStatusChatStore();
  const nav = useNavigate();

  useEffect(() => {
    if (chatState.status === 'approve') {
      setChatState({ status: 'reject', receiveModalOpen: false, sendModalOpen: false });
      nav(ROUTE_PATH.CHAT);
    }
  }, [chatState]);

  const onCloseModal = () => {
    setChatState({ status: 'reject', receiveModalOpen: false, sendModalOpen: false });
    socket?.emit(SOCKET_EVENTS_NAME.CALL_REJECT);
  };

  return (
    <Modal
      title="영상통화 요청"
      open={chatState.sendModalOpen}
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
