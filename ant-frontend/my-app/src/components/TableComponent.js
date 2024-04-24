import React, { useState, useEffect } from 'react';
import { Table, Tooltip } from 'antd';
import { TableOutlined } from '@ant-design/icons';
import '../App.css';
import './Map';

const TableComponent = ({ waypoints }) => {
  const [visible, setVisible] = useState(false);
  const [selectionType] = useState('checkbox');
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    if (waypoints) {
      const updatedDataSource = waypoints.map((waypoint, index) => ({
        key: index + 1,
        waypoint: `Waypoint ${index + 1}`,
        latitude: waypoint.lat,
        longitude: waypoint.lng,
      }));
      setDataSource(updatedDataSource);
    }
  }, [waypoints]);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
  };

  const columns = [
    {
      title: 'Waypoint',
      dataIndex: 'waypoint',
      key: 'waypoint',
    },
    {
      title: 'Latitude',
      dataIndex: 'latitude',
      key: 'latitude',
    },
    {
      title: 'Longitude',
      dataIndex: 'longitude',
      key: 'longitude',
    },
  ];

  console.log("Data:" + JSON.stringify(dataSource));

  return (
    <div>
      {visible && (
        <div
          style={{
            borderRadius: '5%',
            position: 'fixed',
            bottom: 110,
            right: 10,
            zIndex: 999,
            background: '#fff',
            padding: '10px',
            border: '1px solid #1677FF',
          }}
        >
          <Table
            columns={columns}
            dataSource={dataSource}
            rowSelection={{
              type: selectionType,
              ...rowSelection,
            }}
          />
        </div>
      )}

      <div style={{ position: 'fixed', bottom: 50, right: 0, zIndex: 999 }}>
        <Tooltip title="Waypoint Data">
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: '10%',
              background: '#1677FF',
              textAlign: 'center',
              lineHeight: '60px',
              cursor: 'pointer',
              color: '#fff',
            }}
            onClick={toggleVisibility}
          >
            <TableOutlined style={{ fontSize: '30px' }} />
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default TableComponent;