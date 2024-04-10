import React from 'react';
import { Layout } from 'antd';
import Sidebar from './Sidebar';
import TableComponent from './TableComponent';
import TrimbleMapComponent from './Map';

const { Header, Content } = Layout;

const Dashboard = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#fff', padding: 0 }}>
        <Sidebar />
      </Header>
      <Content style={{ marginLeft: 200, padding: '24px', background: '#fff', minHeight: 'calc(100vh - 64px)' }}>
        <div style={{ marginTop: '64px' }}>
          <TrimbleMapComponent />
        </div>
      </Content>
      <TableComponent />
    </Layout>
  );
};

export default Dashboard;