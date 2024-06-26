import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { ROUTE_PATH } from '@/constants';
import { HomePage, ChatPage } from '@/pages';
import { BasicLayout } from '@/layout';
import App from './App';

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        element: <BasicLayout />,
        children: [
          {
            path: ROUTE_PATH.HOME,
            element: <HomePage />,
          },
          {
            path: ROUTE_PATH.CHAT,
            element: <ChatPage />,
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <>
    <RouterProvider router={router} />
  </>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
