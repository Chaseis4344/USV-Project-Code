import React, { useRef, useState } from 'react';
import { Tour, Button, Divider, Space } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
 


const Tutorial = () => {
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);
    const ref4 = useRef(null);
    const ref5 = useRef(null);
    const ref6 = useRef(null);
    const ref7 = useRef(null);

    const [open, setOpen] = useState(false);

    const steps = [
      {
        title: 'Dashboard',
        description: 'The main page of the application. Draw, save, and import polygons here.',
        target: () => ref1.current,  
        placement: 'right',      
      },
      {
        title: 'Polygon Tool',
        description: 'Draw polygons by clicking on the map. Press enter to confirm.',
        target: () => ref2.current,
        placement: 'right', 
      },
      {
        title: 'Delete Tool',
        description: 'Delete the selected polygon.',
        target: () => ref3.current,
        placement: 'right', 
      },
      {
        title: 'Save Tool',
        description: 'Save created polygons.',
        target: () => ref4.current,
        placement: 'right', 
      },
      {
        title: 'Upload Tool',
        description: 'Upload previously created polygons.',
        target: () => ref5.current,
        placement: 'right', 
      },
      {
        title: 'Configuration',
        description: 'Customize the settings and preferences of the application here.',
        target: () => ref6.current,
        placement: 'right', 
      },
      {
        title: 'Waypoint Data',
        description: 'Click to see waypoint data, such as latitude and longitude coordinates.',
        target: () => ref7.current,
        placement: 'right', 
      },
    ];

    return (
      <>
      <Space>
        <Button type="primary" icon={<QuestionCircleOutlined style={{ fontSize: '24px' }} />} onClick={() => setOpen(true)} size="large">
        </Button>
      
        <Button ref={ref1} style={{position: 'fixed', top: 120, left: 160, opacity: 0, pointerEvents: 'none' }}></Button>
        <Button ref={ref2} style={{position: 'fixed', top: 10, left: 210,  opacity: 0, pointerEvents: 'none' }}></Button>
        <Button ref={ref3} style={{position: 'fixed', top: 42, left: 210, opacity: 0, pointerEvents: 'none' }}></Button>
        <Button ref={ref4} style={{position: 'fixed', top: 74, left: 210, opacity: 0, pointerEvents: 'none' }}></Button>
        <Button ref={ref5} style={{position: 'fixed', top: 105, left: 210, opacity: 0, pointerEvents: 'none' }}></Button>
        <Button ref={ref6} style={{position: 'fixed', top: 160, left: 160, opacity: 0, pointerEvents: 'none' }}></Button>
        <Button ref={ref7} style={{position: 'fixed', bottom: 60, right: 15, opacity: 0, pointerEvents: 'none' }}></Button>

        <Divider />
        <Tour open={open} onClose={() => setOpen(false)} mask={false} steps={steps} />
      </Space>
      </>
    );
  };
  export default Tutorial;