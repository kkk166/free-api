import React, { useState } from 'react';
import { Card, Form, Input, Button, Row, Col, message } from 'antd';
import { SaveOutlined } from '@ant-design/icons';

const UserProfileForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleProfileSave = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      console.log('保存个人资料:', values);
      message.success('个人资料保存成功！');
    } catch (error) {
      message.error('保存失败，请检查表单！');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="个人资料">
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          username: 'admin',
          email: 'admin@example.com',
          phone: '13800138000',
          realName: '管理员',
          department: '技术部',
          position: '系统管理员',
        }}
      >
        <Row gutter={24}>
          <Col xs={24} lg={12}>
            <Form.Item
              label="用户名"
              name="username"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input disabled />
            </Form.Item>
          </Col>
          <Col xs={24} lg={12}>
            <Form.Item
              label="真实姓名"
              name="realName"
              rules={[{ required: true, message: '请输入真实姓名' }]}
            >
              <Input placeholder="请输入真实姓名" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col xs={24} lg={12}>
            <Form.Item
              label="邮箱"
              name="email"
              rules={[
                { required: true, message: '请输入邮箱' },
                { type: 'email', message: '请输入有效的邮箱地址' }
              ]}
            >
              <Input placeholder="请输入邮箱" />
            </Form.Item>
          </Col>
          <Col xs={24} lg={12}>
            <Form.Item
              label="手机号"
              name="phone"
              rules={[
                { required: true, message: '请输入手机号' },
                { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号' }
              ]}
            >
              <Input placeholder="请输入手机号" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col xs={24} lg={12}>
            <Form.Item
              label="部门"
              name="department"
            >
              <Input placeholder="请输入部门" />
            </Form.Item>
          </Col>
          <Col xs={24} lg={12}>
            <Form.Item
              label="职位"
              name="position"
            >
              <Input placeholder="请输入职位" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" loading={loading} onClick={handleProfileSave}>
            保存资料
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default UserProfileForm;
