import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Space, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './LoginPage.less';

const { Title, Text } = Typography;

const LoginPage = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // 模拟登录验证
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (values.username === 'admin' && values.password === '123456') {
        message.success('登录成功！');
        onLogin();
      } else {
        message.error('用户名或密码错误！');
      }
    } catch (error) {
      message.error('登录失败，请重试！');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <img 
          src="https://weavefox.alipay.com/api/bolt/unsplash_image?keyword=office&width=1920&height=1080&random=office_1920_1080" 
          alt="Background" 
        />
      </div>
      <div className="login-form-container">
        <Card className="login-card">
          <div className="login-header">
            <img 
              src="https://weavefox.alipay.com/api/bolt/unsplash_image?keyword=company+logo&width=200&height=80&random=logo_200_80" 
              alt="Logo" 
              className="login-logo"
            />
            <Title level={2}>管理系统</Title>
            <Text type="secondary">欢迎回来，请登录您的账户</Text>
          </div>
          
          <Form
            form={form}
            name="login"
            onFinish={handleSubmit}
            layout="vertical"
            size="large"
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入用户名！' }]}
            >
              <Input 
                prefix={<UserOutlined />} 
                placeholder="用户名：admin" 
              />
            </Form.Item>
            
            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码！' }]}
            >
              <Input.Password 
                prefix={<LockOutlined />} 
                placeholder="密码：123456" 
              />
            </Form.Item>
            
            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
                block
                size="large"
              >
                登录
              </Button>
            </Form.Item>
          </Form>
          
          <div className="login-footer">
            <Space>
              <a href="#forgot">忘记密码？</a>
              <a href="#register">注册账户</a>
            </Space>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
