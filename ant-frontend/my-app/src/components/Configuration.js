import React, { useEffect, useState } from 'react';
import { Layout, Typography, Form, Input, Select, Button, Checkbox, Slider } from 'antd';
import Sidebar from './Sidebar';
import { useForm } from 'antd/es/form/Form';

const { Content, Sider } = Layout;
const { Title, Paragraph } = Typography;


  //Configs will be stored as JSON objects with key value pairs
  const updateConfig = (newConfig) => {
    localStorage.setItem("config", JSON.stringify(newConfig));
  };

  const clearConfig = () =>{
    if(localStorage.getItem("config"))
    {
      localStorage.removeItem("config");
    }
    else
    {
      console.warn("404, config not found to clear")
    }
  }

  const getConfig = () =>
  { 
      var config;
        try 
        {
         config = JSON.parse(localStorage.getItem("config"));
        }  
        catch (ex)
        {
          console.error(ex);
          config = null;
        }
    console.log("Got:" + JSON.stringify(config));
    return config;
  }

const Configuration = () => {

    //How do I initalize this state?
    const form = useState({});

    const onFinish = (values) => {
        console.log('Form values:', values);
        updateConfig(values);
    };
    
    //Is this a hook for startup?
    useEffect(() => { 
            form.setFields(getConfig());
        } ) 
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider width={200} style={{ background: '#fff' }}>
                <Sidebar /> {/* Your Sidebar component */}
            </Sider>
            <Layout>
                <Content style={{ margin: '0px 0px 0', background: '#fff', padding: 24 }}>
                    <Title level={2}>Configuration</Title>
                    <Paragraph>Customize the settings and preferences for your application.</Paragraph>
                    <Form onFinish={onFinish} layout="vertical" initialValues={getConfig}>
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
