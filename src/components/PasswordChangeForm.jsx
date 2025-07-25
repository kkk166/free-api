import React, { useState } from 'react';
import { Card, Form, Input, Button, Row, Col, message } from 'antd';
import { LockOutlined } from '@ant-design/icons';

const PasswordChangeForm = () => {
  const [passwordForm] = Form.useForm();
  const [passwordLoading, setPasswordLoading] = useState(false);

  const handlePasswordChange = async () => {
    setPasswordLoading(true);
    try {
      const values = await passwordForm.validateFields();
      if (values.newPassword !== values.confirmPassword) {
        message.error('两次输入的新密码不一致！');
        return;
      }
      console.log('修改密码:', values);
      message.success('密码修改成功！');
      passwordForm.resetFields();
    } catch (error) {
      message.error('修改失败，请检查表单！');
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <Card title="修改密码">
      <Form
        form={passwordForm}
        layout="vertical"
      >
        <Row gutter={24}>
          <Col xs={24} lg={8}>
            <Form.Item
              label="当前密码"
              name="currentPassword"
              rules={[{ required: true, message: '请输入当前密码' }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="请输入当前密码" />
            </Form.Item>
          </Col>
          <Col xs={24} lg={8}>
            <Form.Item
              label="新密码"
              name="newPassword"
              rules={[
                { required: true, message: '请输入新密码' },
                { min: 6, message: '密码长度至少6位' }
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="请输入新密码" />
            </Form.Item>
          </Col>
          <Col xs={24} lg={8}>
            <Form.Item
              label="确认新密码"
              name="confirmPassword"
              rules={[
                { required: true, message: '请确认新密码' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('两次输入的密码不一致'));
                  },
                }),
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="请确认新密码" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button 
            type="primary" 
            loading={passwordLoading} 
            onClick={handlePasswordChange}
          >
            修改密码
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default PasswordChangeForm;
