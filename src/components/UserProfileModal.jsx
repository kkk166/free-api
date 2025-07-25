import React, { useState } from 'react';
import { Modal, Form, Input, Button, Row, Col, message, Avatar, Upload, Space } from 'antd';
import { UserOutlined, UploadOutlined, SaveOutlined } from '@ant-design/icons';

const UserProfileModal = ({ visible, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleOk = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      console.log('保存个人资料:', values);
      message.success('个人资料保存成功！');
      onClose();
    } catch (error) {
      message.error('保存失败，请检查表单！');
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = (info) => {
    if (info.file.status === 'done') {
      message.success('头像上传成功！');
    } else if (info.file.status === 'error') {
      message.error('头像上传失败！');
    }
  };

  return (
    <Modal
      title="个人资料"
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          取消
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
          保存
        </Button>,
      ]}
      width={600}
    >
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
        <Row gutter={24} align="middle">
          <Col span={8}>
            <Space direction="vertical" align="center" style={{ width: '100%' }}>
              <Avatar 
                size={100} 
                src="https://weavefox.alipay.com/api/bolt/unsplash_image?keyword=person+avatar&width=200&height=200&random=avatar_200_200"
                icon={<UserOutlined />}
              />
              <Upload
                name="avatar"
                listType="picture"
                showUploadList={false}
                onChange={handleAvatarChange}
                customRequest={({ onSuccess }) => {
                  setTimeout(() => {
                    onSuccess('ok');
                  }, 1000);
                }}
              >
                <Button icon={<UploadOutlined />} size="small">
                  更换头像
                </Button>
              </Upload>
            </Space>
          </Col>
          <Col span={16}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="用户名"
                  name="username"
                  rules={[{ required: true, message: '请输入用户名' }]}
                >
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="真实姓名"
                  name="realName"
                  rules={[{ required: true, message: '请输入真实姓名' }]}
                >
                  <Input placeholder="请输入真实姓名" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
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
              <Col span={12}>
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

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="部门"
                  name="department"
                >
                  <Input placeholder="请输入部门" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="职位"
                  name="position"
                >
                  <Input placeholder="请输入职位" />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default UserProfileModal;
