import React, { useState } from 'react';
import { TableOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import TableInfo from './TableInfo';


const TableComponent = ({ waypoints }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  
  return (
    <div>
      <div style={{ display: visible ? 'block' : 'none', position: 'fixed', bottom: 110, right: 20, zIndex: 999, background: '#fff', padding: '10px', border: '1px solid #1677FF' }}>
        <TableInfo waypoints={waypoints}/>
      </div>
      <div style={{ position: 'fixed', bottom: 50, right: 0, zIndex: 999 }}>
        <Tooltip title="Waypoint Data">
          <div style={{ width: 50, height: 50, borderRadius: '10%', background: '#1677FF', textAlign: 'center', lineHeight: '60px', cursor: 'pointer', color: '#fff' }} onClick={toggleVisibility}>
            <TableOutlined style={{ fontSize: '30px' }} />
            
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

  export default TableComponent;