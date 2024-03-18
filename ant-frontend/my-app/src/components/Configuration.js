import React from 'react';
import { Layout, Typography, Form, Input, Select, Button, Checkbox, Slider } from 'antd';
import Sidebar from './Sidebar';

const { Content, Sider } = Layout;
const { Title, Paragraph } = Typography;

const Configuration = () => {
    const onFinish = (values) => {
        console.log('Form values:', values);
        // Handle form submission logic here
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
                    <Form onFinish={onFinish} layout="vertical">
                        <Form.Item
                            name="apiKey"
                            label="API Key"
                            rules={[{ required: true, message: 'Please enter the API key' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="someSetting"
                            label="Some Setting"
                            rules={[{ required: true, message: 'Please select a setting' }]}
                        >
                            <Select>
                                <Select.Option value="light">Light</Select.Option>
                                <Select.Option value="dark">Dark</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="rememberMe"
                            valuePropName="checked"
                        >
                            <Checkbox>Remember me</Checkbox>
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
                                defaultValue={30}
                            />
                        </Form.Item>
                        <Form.Item>
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
