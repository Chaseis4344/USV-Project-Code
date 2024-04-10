import React, { useState } from 'react';
import { Table } from 'antd';
import '../App.css';
import './Map'


const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
};

const TableInfo = ({ waypoints }) => {

  const [selectionType] = useState('checkbox');
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

  let data = [];

  if (waypoints && waypoints.length > 0) {
      data = waypoints.map((waypoint, index) => ({
          key: index,
          waypoint: `Waypoint ${index + 1}`,
          latitude: waypoint.latitude,
          longitude: waypoint.longitude,
      }));
  }

  return (
      <Table 
      columns={columns}
      dataSource={data} 
      rowSelection={{
        type: selectionType,
        ...rowSelection,
      }}/>
  );
};


export default TableInfo;