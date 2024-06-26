import { Layout } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@/constants';

const BasicLayout = () => {
  const navigate = useNavigate();

  const pathList = window.location.pathname.split('/').filter((v) => !!v);
  return (
    <Layout className="min-h-screen">
      <Layout.Header className="h-[60px] text-white">
        <button className="hover:text-sky-400" onClick={() => navigate(ROUTE_PATH.HOME)}>
          WebRTC Client
        </button>
      </Layout.Header>
      <Layout.Content className="p-6 min-h-[calc(100vh-60px)] overflow-y-auto">
        <div className="flex items-center gap-3 mb-6">
          {pathList.map((path, idx) => (
            <span key={idx}>{path}</span>
          ))}
        </div>
        <div className="h-full bg-white rounded p-6">
          <Outlet />
        </div>
      </Layout.Content>
    </Layout>
  );
};

export default BasicLayout;
