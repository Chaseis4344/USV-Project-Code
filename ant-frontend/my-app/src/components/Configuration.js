import React, { useContext } from 'react';
import { Layout, Typography, Form, Input, Select, Button, Checkbox, Slider } from 'antd';
import Sidebar from './Sidebar';

import { ConfigContext } from '../context/ConfigContext';


const { Content, Sider } = Layout;
const { Title, Paragraph } = Typography;

const Configuration = () => {
const configIO = useContext(ConfigContext);
    const onFinish = (values) => {
        console.log('Form values:', values);
        configIO.setConfig(values);// Will be updated when we can
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider width={200} style={{ background: '#fff' }}>
                <Sidebar /> {/* Your Sidebar component */}
            </Sider>
            <Layout>
                <Content style={{ margin: '0px 0px 0', background: '#fff', padding: 24 }}>
                    <Title level={2}>Configuration</Title>
                    <Paragraph>Customize the settings and preferences for your application.</Paragraph>
                    <Form onFinish={onFinish} layout="vertical" initialValues={configIO.getConfig()}>
                        <Form.Item
                            name="apiKey"
                            label="API Key"
                            rules={[{ required: true, message: 'Please enter the API key' }]}
                           // initialValue={config.apiKey}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="boatIP"
                            label="USV IP"
                            rules ={[{required: true, message: 'Please provide an IP for the boat'}]}
                        >
                            
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="boatGPSPort"
                            label="Incoming USV GPS Port"
                            rules ={[{required: true, message: 'Please provide an port to request GPS Data'}]}
                        >
                            
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="boatDataPort"
                            label="Incoming USV Sonar Port"
                            rules ={[{required: true, message: 'Please provide an port to request GPS Data'}]}
                        >
                            
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="remoteDataStashIP"
                            label="Remote Data Endpoint IP"
                            rules ={[{required: true, message: 'Please provide an IP to send unproccessed sonar data'}]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            name="typeOfLines"
                            label="Some Way We Draw Lines"
                            rules={[{ required: true, message: 'Please select an option' }]}
                        >
                            <Select>
                                <Select.Option value="enabled">Enabled</Select.Option>
                                <Select.Option value="disabled">Disabled</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="sliderExample"
                            label="Slider Example"
                        >
                            <Slider
                                initialValue={30}
                            />
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 24, offset: 20 }}>
                            <Button type="primary" htmlType="submit">
                                Save Configuration
                            </Button>
                        </Form.Item>
                    </Form>
                </Content>
            </Layout>
        </Layout>
    );
};

export default Configuration;
