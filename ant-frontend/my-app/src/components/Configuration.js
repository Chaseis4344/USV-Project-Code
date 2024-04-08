import React, { useContext } from 'react';
import { Layout, Typography, Form, Input, Select, Button, Checkbox, Slider } from 'antd';
import Sidebar from './Sidebar';
import { ConfigContext } from '../context/ConfigContext';
import {
  APIKeyDesc,
  USVIPDesc,
  InUSVGPSDesc,
  InUSVSonDesc,
  RDEipDesc,
  someSettingdesc,
  someDrawingwayDesc,
  sliderEGDesc,
} from '../config';

const { Content, Sider } = Layout;
const { Title, Paragraph } = Typography;



const Configuration = () => {
  const { config, updateConfig } = useContext(ConfigContext);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Form values:', values);
    updateConfig(values);
  };

  React.useEffect(() => {
    form.setFieldsValue(config);
  }, [config, form]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200} style={{ background: '#fff' }}>
        <Sidebar /> {}
      </Sider>
      <Layout>
        <Content style={{ margin: '0px 0px 0', background: '#fff', padding: 24 }}>
          <Title level={2}>Configuration</Title>
          <Paragraph>Customize the settings and preferences for your application.</Paragraph>
          <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item
              name="apiKey"
              label="API Key"
              tooltip={APIKeyDesc}
              rules={[{ required: true, message: 'Please enter the API key' }]}
              
            >
              <Input />
            </Form.Item>
            <Form.Item
                            name="boatIP"
                            label="USV IP"
                            tooltip={USVIPDesc}
                            rules ={[{required: true, message: 'Please provide an IP for the boat'}]}
                        >

                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="boatGPSPort"
                            label="Incoming USV GPS Port"
                            tooltip={InUSVGPSDesc}
                            rules ={[{required: true, message: 'Please provide an port to request GPS Data'}]}
                        >

                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="boatDataPort"
                            label="Incoming USV Sonar Port"
                            tooltip={InUSVSonDesc}
                            rules ={[{required: true, message: 'Please provide an port to request GPS Data'}]}
                        >

                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="remoteDataStashIP"
                            label="Remote Data Endpoint IP"
                            tooltip={RDEipDesc}
                            rules ={[{required: true, message: 'Please provide an IP to send unproccessed sonar data'}]}
                        >
                            <Input/>
                        </Form.Item>
            <Form.Item
              name="someSetting"
              label="Some Setting"
              tooltip={someSettingdesc}
              rules={[{ required: true, message: 'Please select a setting' }]}
            >
              <Select>
                <Select.Option value="light">Light</Select.Option>
                <Select.Option value="dark">Dark</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="rememberMe" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Form.Item
              name="typeOfLines"
              label="Some Way We Draw Lines"
              tooltip={someDrawingwayDesc}
              rules={[{ required: true, message: 'Please select an option' }]}
            >
              <Select>
                <Select.Option value="enabled">Enabled</Select.Option>
                <Select.Option value="disabled">Disabled</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="sliderExample" label="Slider Example" tooltip={sliderEGDesc}>
              <Slider />
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