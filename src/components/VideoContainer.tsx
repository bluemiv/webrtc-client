import React from 'react';
import { TPropsWithClassName } from '@/types';
import Video from '@/components/Video';

interface TProps {
  title: string;
  stream?: MediaStream | null;
  muted?: boolean;
}

const VideoContainer = ({
  className,
  title,
  stream,
  muted = false,
}: TPropsWithClassName<TProps>) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div>{title}</div>
      <div>
        <Video stream={stream} muted={muted} />
      </div>
    </div>
  );
};

export default VideoContainer;
