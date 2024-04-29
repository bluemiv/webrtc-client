import React from 'react';
import { TPropsWithClassName } from '@/types';
import Video from '@/components/Video';

interface TProps {
  title: string;
}

const VideoContainer = ({ className, title }: TPropsWithClassName<TProps>) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div>{title}</div>
      <div>
        <Video />
      </div>
    </div>
  );
};

export default VideoContainer;
