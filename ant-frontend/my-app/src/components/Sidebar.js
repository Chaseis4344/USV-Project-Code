import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';

const { Sider } = Layout;

const Sidebar = () => {
  const location = useLocation();

  // Get the current path without the leading slash
  const currentPath = location.pathname.slice(1);

  return (
    <Layout>
      <Sider
        width={200}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          overflowY: 'auto',
          height: '100vh',
          zIndex: 1,
        }}
      >
        <div
          style={{
            height: '64px',
            margin: '16px',
            display: 'flex',
            justifyContent: 'top-left',
            alignItems: 'top-left',
          }}
        >
          <img src="/logo.png" alt="Site Logo" style={{ maxWidth: '100%', maxHeight: '100%' }} />
        </div>
        <Menu theme="dark" mode="inline" selectedKeys={[currentPath]} style={{ marginTop: '32px' }}>
          <Menu.Item key="">
            <Link to="/">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="configuration">
            <Link to="/configuration">Configuration</Link>
          </Menu.Item>
          {/* Add more menu items for other pages */}
        </Menu>
      </Sider>
      <Layout style={{ marginLeft: 200, marginTop: '64px' }}>
        {/* Rest of your content */}
      </Layout>
    </Layout>
  );
};

export default Sidebar;