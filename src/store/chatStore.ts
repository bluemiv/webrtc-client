import { create } from 'zustand';
import { Socket } from 'socket.io-client';

interface TState {
  socket: Socket | null;
  setSocket: (nextSocket: Socket) => void;
  pc: RTCPeerConnection | null;
  setPC: (nextPC: RTCPeerConnection) => void;
}

const useChatStore = create<TState>()((set) => ({
  socket: null,
  setSocket: (nextSocket) => set((_) => ({ socket: nextSocket })),
  pc: null,
  setPC: (nextPC) => set((_) => ({ pc: nextPC })),
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
