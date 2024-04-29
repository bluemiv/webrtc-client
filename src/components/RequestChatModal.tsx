import React, { useEffect } from 'react';
import { Button, Modal } from 'antd';
import { TPropsWithModal } from '@/types';
import { useNavigate } from 'react-router-dom';

const RequestChatModal = ({ open, onClose }: TPropsWithModal) => {
  const nav = useNavigate();

  return (
    <Modal
      title="영상통화 요청"
      open={open}
      onCancel={() => onClose?.(false)}
      footer={
        <>
          <Button onClick={() => onClose?.(false)}>닫기</Button>
        </>
      }
    >
      영상통화 요청 중 입니다. 잠시만 기다려주세요.
    </Modal>
  );
};

export default RequestChatModal;
