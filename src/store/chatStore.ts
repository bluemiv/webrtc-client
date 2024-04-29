import { create } from 'zustand';
import { Socket } from 'socket.io-client';
import { ROOM_NAME, SOCKET_EVENTS_NAME } from '@/constants';

interface TState {
  socket: Socket | null;
  setSocket: (nextSocket: Socket) => void;
  pc: RTCPeerConnection | null;
  setPC: (nextPC: RTCPeerConnection) => void;
  callStatus: {
    status: 'approve' | 'reject';
    sendModalOpen: boolean;
    receiveModalOpen: boolean;
  };
  setCallStatus: (callStatus: {
    status: 'approve' | 'reject';
    sendModalOpen: boolean;
    receiveModalOpen: boolean;
  }) => void;
}

const useChatStore = create<TState>()((set) => ({
  socket: null,
  setSocket: (nextSocket) =>
    set((state) => {
      nextSocket.on(SOCKET_EVENTS_NAME.INIT, (data) => {
        const { stun, turn } = data?.servers || {};
        const pc = new RTCPeerConnection({
          iceServers: [...stun, ...turn],
        });
        state.setPC(pc);
        pc.onicecandidate = (event) => {
          if (!event.candidate) return;
          nextSocket.emit(SOCKET_EVENTS_NAME.CANDIDATE, { candidate: event.candidate });
        };
      });

      nextSocket.on(SOCKET_EVENTS_NAME.CALL, (data) => {
        if (data.sender === nextSocket.id) return;
        state.setCallStatus({ ...state.callStatus, receiveModalOpen: true });
      });

      nextSocket.on(SOCKET_EVENTS_NAME.CALL_APPROVE, (data) => {
        if (data.sender === nextSocket.id) return;
        state.setCallStatus({ status: 'approve', receiveModalOpen: false, sendModalOpen: false });
      });

      nextSocket.on(SOCKET_EVENTS_NAME.CALL_REJECT, (data) => {
        if (data.sender === nextSocket.id) return;
        state.setCallStatus({ status: 'reject', receiveModalOpen: false, sendModalOpen: false });
      });

      nextSocket.emit(SOCKET_EVENTS_NAME.INIT);
      nextSocket.emit(SOCKET_EVENTS_NAME.JOIN_ROOM, { room: ROOM_NAME });
      return { socket: nextSocket };
    }),
  pc: null,
  setPC: (nextPC) => set((_) => ({ pc: nextPC })),
  callStatus: {
    status: 'reject',
    sendModalOpen: false,
    receiveModalOpen: false,
  },
  setCallStatus: (nextCallStatus) => set((_) => ({ callStatus: nextCallStatus })),
}));

export const useSocketChatStore = () =>
  useChatStore((state) => ({
    socket: state.socket,
    setSocket: state.setSocket,
  }));

export const useRTCPCChatStore = () =>
  useChatStore((state) => ({
    pc: state.pc,
    setPC: state.setPC,
  }));

export const useCallStatusChatStore = () =>
  useChatStore((state) => ({
    callStatus: state.callStatus,
    setCallStatus: state.setCallStatus,
  }));
