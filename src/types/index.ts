import { ReactNode } from 'react';

export type TPropsWithClassName<T = unknown> = T & {
  className?: string;
};

export type TPropsWithChildren<T = unknown> = T & {
  children?: ReactNode;
};

export type TPropsWithBaseComponent<T = unknown> = T & TPropsWithClassName & TPropsWithChildren;

export type TPropsWithModal<T = unknown> = T & {
  open?: boolean;
  onClose?: (refresh?: boolean) => void;
};
