import React, { useState } from 'react';
import { Table } from 'antd';
import '../App.css';

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
};

const TableInfo = ({ waypoints }) => {
 // console.log("Waypoints:", waypoints); //testing
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

  let data =[];

  if (waypoints && waypoints.length > 0) {
     /* data = waypoints.map((waypoint, index) => ({
          key: index,
          waypoint: `Waypoint ${index + 1}`,
          latitude: waypoint[0][index][0],
          longitude: waypoint[0][index][1],
      }));*/
      waypoints.forEach((waypoint,index)=> {
        data.push(({
          key: index+1,
          waypoint: `Waypoint ${index + 1}`,
          latitude: waypoint[index][0],
          longitude: waypoint[index][1],
      }))
      });
     // setData(temp)
  }
  
  console.log("Data:"+JSON.stringify(data))
  const data2 = useState(data);

  return (
      <Table columns={columns} dataSource={data2} rowSelection={{
        type: selectionType,
        ...rowSelection,
      }}/>
  );
};


export default TableInfo;