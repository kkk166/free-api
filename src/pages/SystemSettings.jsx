import React, { useState } from 'react';
import { 
  Card, Form, Input, Switch, Select, Button, Space, message, 
  Row, Col, Typography, Tabs, Timeline, Modal, InputNumber, 
  DatePicker, TimePicker, Checkbox, Radio, Badge, Descriptions
} from 'antd';
import { 
  SaveOutlined, ReloadOutlined, MailOutlined, SecurityScanOutlined, 
  GlobalOutlined, BellOutlined, SendOutlined, ClockCircleOutlined,
  UserOutlined, MobileOutlined, DesktopOutlined, CheckCircleOutlined,
  SettingFilled, InfoCircleOutlined
} from '@ant-design/icons';
import './SystemSettings.less';

const { Option } = Select;
const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const SystemSettings = () => {
  const [form] = Form.useForm();
  const [pushForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [pushModalVisible, setPushModalVisible] = useState(false);
  const [testModalVisible, setTestModalVisible] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      console.log('保存设置:', values);
      message.success('设置保存成功！');
    } catch (error) {
      message.error('保存失败，请检查表单！');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    form.resetFields();
    message.info('已重置为默认值');
  };

  const handlePushSave = async () => {
    try {
      const values = await pushForm.validateFields();
      console.log('保存推送设置:', values);
      message.success('推送设置保存成功！');
      setPushModalVisible(false);
    } catch (error) {
      message.error('保存失败！');
    }
  };

  const handleTestPush = async () => {
    try {
      const values = await pushForm.validateFields();
      console.log('测试推送:', values);
      message.success('测试推送已发送！');
      setTestModalVisible(false);
    } catch (error) {
      message.error('测试失败！');
    }
  };

  const settingsTabs = [
    {
      key: 'general',
      label: '基础设置',
      icon: <GlobalOutlined />,
      content: (
        <div className="settings-grid">
          <Card className="settings-card" title="网站信息">
            <Form layout="vertical" size="large">
              <Row gutter={24}>
                <Col span={24}>
                  <Form.Item label="网站名称" name="siteName" rules={[{ required: true }]}>
                    <Input placeholder="请输入网站名称" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={24}>
                  <Form.Item label="网站域名" name="siteDomain">
                    <Input placeholder="example.com" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={24}>
                  <Form.Item label="网站描述" name="siteDescription">
                    <TextArea rows={3} placeholder="简短描述" maxLength={200} showCount />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>

          <Card className="settings-card" title="系统配置">
            <Form layout="vertical" size="large">
              <Row gutter={24}>
                <Col span={24}>
                  <Form.Item label="默认时区" name="timezone">
                    <Select placeholder="请选择时区">
                      <Option value="Asia/Shanghai">(GMT+8) 亚洲/上海</Option>
                      <Option value="America/New_York">(GMT-5) 美国/纽约</Option>
                      <Option value="Europe/London">(GMT+0) 欧洲/伦敦</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={24}>
                  <Form.Item label="默认语言" name="language">
                    <Select placeholder="请选择语言">
                      <Option value="zh-CN">简体中文</Option>
                      <Option value="en-US">English</Option>
                      <Option value="ja-JP">日本語</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={24}>
                  <Form.Item label="维护模式" name="maintenanceMode" valuePropName="checked">
                    <Switch checkedChildren="开启" unCheckedChildren="关闭" />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>

          <Card className="settings-card" title="外观设置">
            <Form layout="vertical" size="large">
              <Row gutter={24}>
                <Col span={24}>
                  <Form.Item label="主题颜色" name="themeColor">
                    <Select placeholder="选择主题色">
                      <Option value="blue">蓝色主题</Option>
                      <Option value="green">绿色主题</Option>
                      <Option value="purple">紫色主题</Option>
                      <Option value="red">红色主题</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={24}>
                  <Form.Item label="Logo" name="siteLogo">
                    <Input placeholder="输入Logo URL" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={24}>
                  <Form.Item label="网站图标" name="siteFavicon">
                    <Input placeholder="输入favicon URL" />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
        </div>
      ),
    },
    {
      key: 'email',
      label: '邮件配置',
      icon: <MailOutlined />,
      content: (
        <div className="settings-grid">
          <Card className="settings-card" title="SMTP设置">
            <Form layout="vertical" size="large">
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item label="SMTP服务器" name="smtpHost" rules={[{ required: true }]}>
                    <Input placeholder="smtp.gmail.com" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="SMTP端口" name="smtpPort" rules={[{ required: true }]}>
                    <InputNumber placeholder="587" style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item label="用户名" name="smtpUser" rules={[{ required: true }]}>
                    <Input placeholder="邮箱地址" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="密码" name="smtpPass" rules={[{ required: true }]}>
                    <Input.Password placeholder="邮箱密码或授权码" />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>

          <Card className="settings-card" title="邮件模板">
            <Form layout="vertical" size="large">
              <Row gutter={24}>
                <Col span={24}>
                  <Form.Item label="发件人邮箱" name="fromEmail" rules={[{ required: true }]}>
                    <Input placeholder="noreply@example.com" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={24}>
                  <Form.Item label="发件人名称" name="fromName" rules={[{ required: true }]}>
                    <Input placeholder="管理系统" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={24}>
                  <Form.Item label="邮件签名" name="emailSignature">
                    <TextArea rows={3} placeholder="邮件底部签名" maxLength={200} showCount />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>

          <Card className="settings-card" title="测试邮件">
            <Space>
              <Button type="primary" icon={<SendOutlined />}>发送测试邮件</Button>
              <Button>查看邮件日志</Button>
            </Space>
          </Card>
        </div>
      ),
    },
    {
      key: 'security',
      label: '安全设置',
      icon: <SecurityScanOutlined />,
      content: (
        <div className="settings-grid">
          <Card className="settings-card" title="账户安全">
            <Form layout="vertical" size="large">
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item label="会话超时(分钟)" name="sessionTimeout">
                    <InputNumber min={5} max={1440} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="最大登录尝试" name="maxLoginAttempts">
                    <InputNumber min={1} max={10} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item label="锁定时间(分钟)" name="lockoutDuration">
                    <InputNumber min={1} max={1440} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="密码最小长度" name="passwordMinLength">
                    <InputNumber min={6} max={32} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>

          <Card className="settings-card" title="密码策略">
            <Form layout="vertical" size="large">
              <Row gutter={24}>
                <Col span={24}>
                  <Form.Item label="启用双因素认证" name="enableTwoFactor" valuePropName="checked">
                    <Switch />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={24}>
                  <Form.Item label="要求复杂密码" name="requireComplexPassword" valuePropName="checked">
                    <Switch />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={24}>
                  <Form.Item label="定期修改密码" name="requirePasswordChange" valuePropName="checked">
                    <Switch />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={24}>
                  <Form.Item label="密码有效期(天)" name="passwordExpiry">
                    <InputNumber min={1} max={365} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>

          <Card className="settings-card" title="登录安全">
            <Form layout="vertical" size="large">
              <Row gutter={24}>
                <Col span={24}>
                  <Form.Item label="IP白名单" name="ipWhitelist">
                    <TextArea rows={3} placeholder="允许登录的IP地址，每行一个" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={24}>
                  <Form.Item label="登录通知" name="loginNotification" valuePropName="checked">
                    <Switch />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
        </div>
      ),
    },
    {
      key: 'push',
      label: '推送通知',
      icon: <BellOutlined />,
      content: (
        <div className="settings-grid">
          <Card className="settings-card" title="推送服务">
            <Form layout="vertical" size="large">
              <Row gutter={24}>
                <Col span={24}>
                  <Form.Item label="启用推送服务" name="enablePush" valuePropName="checked">
                    <Switch />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={24}>
                  <Form.Item label="推送平台" name="pushPlatform">
                    <Checkbox.Group>
                      <Checkbox value="web">Web推送</Checkbox>
                      <Checkbox value="mobile">移动推送</Checkbox>
                      <Checkbox value="email">邮件推送</Checkbox>
                    </Checkbox.Group>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={24}>
                  <Space>
                    <Button type="primary" onClick={() => setPushModalVisible(true)}>
                      配置推送规则
                    </Button>
                    <Button onClick={() => setTestModalVisible(true)}>
                      测试推送
                    </Button>
                  </Space>
                </Col>
              </Row>
            </Form>
          </Card>

          <Card className="settings-card" title="推送统计">
            <Row gutter={16}>
              <Col span={8}>
                <div className="stat-item">
                  <Title level={3} style={{ color: '#1890ff', margin: 0 }}>1,247</Title>
                  <Text>今日推送</Text>
                </div>
              </Col>
              <Col span={8}>
                <div className="stat-item">
                  <Title level={3} style={{ color: '#52c41a', margin: 0 }}>89%</Title>
                  <Text>送达率</Text>
                </div>
              </Col>
              <Col span={8}>
                <div className="stat-item">
                  <Title level={3} style={{ color: '#faad14', margin: 0 }}>23%</Title>
                  <Text>点击率</Text>
                </div>
              </Col>
            </Row>
          </Card>

          <Card className="settings-card" title="推送历史">
            <Timeline
              items={[
                {
                  dot: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
                  children: (
                    <div>
                      <Text strong>系统更新通知</Text>
                      <br />
                      <Text type="secondary">已推送给1,247个用户</Text>
                      <br />
                      <Text type="secondary">2小时前</Text>
                    </div>
                  ),
                },
                {
                  dot: <MobileOutlined style={{ color: '#1890ff' }} />,
                  children: (
                    <div>
                      <Text strong>新用户欢迎消息</Text>
                      <br />
                      <Text type="secondary">已推送给89个新用户</Text>
                      <br />
                      <Text type="secondary">5小时前</Text>
                    </div>
                  ),
                },
                {
                  dot: <DesktopOutlined style={{ color: '#722ed1' }} />,
                  children: (
                    <div>
                      <Text strong>维护通知</Text>
                      <br />
                      <Text type="secondary">已推送给所有用户</Text>
                      <br />
                      <Text type="secondary">1天前</Text>
                    </div>
                  ),
                },
              ]}
            />
          </Card>
        </div>
      ),
    },
  ];

  return (
    <div className="system-settings">
      <div className="settings-header">
        <Space direction="vertical" size="small" style={{ width: '100%', textAlign: 'center' }}>
          <Title level={2} style={{ margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
            <SettingFilled style={{ color: '#1890ff' }} />
            系统设置
          </Title>
          <Space>
            <Badge status="processing" text="在线" />
            <Text type="secondary">上次保存: 2分钟前</Text>
          </Space>
        </Space>
      </div>

      <div className="settings-container">
        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          className="settings-tabs"
          items={settingsTabs.map(tab => ({
            key: tab.key,
            label: (
              <span className="tab-label">
                {tab.icon}
                <span>{tab.label}</span>
              </span>
            ),
            children: tab.content,
          }))}
        />

        <div className="settings-footer">
          <Space>
            <Button 
              icon={<ReloadOutlined />} 
              onClick={handleReset}
              size="large"
            >
              重置
            </Button>
            <Button 
              type="primary" 
              icon={<SaveOutlined />} 
              loading={loading}
              onClick={handleSave}
              size="large"
            >
              保存设置
            </Button>
          </Space>
        </div>
      </div>

      {/* 推送配置模态框 */}
      <Modal
        title="配置推送规则"
        open={pushModalVisible}
        onCancel={() => setPushModalVisible(false)}
        onOk={handlePushSave}
        width={600}
      >
        <Form form={pushForm} layout="vertical">
          <Form.Item label="规则名称" name="ruleName" rules={[{ required: true }]}>
            <Input placeholder="如：新用户欢迎推送" />
          </Form.Item>
          
          <Form.Item label="触发条件" name="triggerCondition" rules={[{ required: true }]}>
            <Select placeholder="选择触发条件">
              <Option value="register">用户注册</Option>
              <Option value="login">用户登录</Option>
              <Option value="order">订单完成</Option>
              <Option value="schedule">定时推送</Option>
            </Select>
          </Form.Item>

          <Form.Item label="推送时间" name="pushTime">
            <Radio.Group>
              <Radio value="immediate">立即推送</Radio>
              <Radio value="delay">延迟推送</Radio>
              <Radio value="schedule">定时推送</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="推送时间设置" name="scheduleTime">
            <Space>
              <DatePicker />
              <TimePicker format="HH:mm" />
            </Space>
          </Form.Item>

          <Form.Item label="推送内容" name="pushContent" rules={[{ required: true }]}>
            <TextArea 
              rows={4} 
              placeholder="请输入推送内容"
              maxLength={200}
              showCount
            />
          </Form.Item>

          <Form.Item label="目标用户" name="targetUsers">
            <Select mode="multiple" placeholder="选择用户组">
              <Option value="all">所有用户</Option>
              <Option value="new">新用户</Option>
              <Option value="vip">VIP用户</Option>
              <Option value="inactive">不活跃用户</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      {/* 测试推送模态框 */}
      <Modal
        title="测试推送"
        open={testModalVisible}
        onCancel={() => setTestModalVisible(false)}
        onOk={handleTestPush}
      >
        <Form form={pushForm} layout="vertical">
          <Form.Item label="测试用户" name="testUser" rules={[{ required: true }]}>
            <Input placeholder="输入测试用户ID或邮箱" />
          </Form.Item>
          <Form.Item label="测试内容" name="testContent" rules={[{ required: true }]}>
            <TextArea rows={3} placeholder="输入测试推送内容" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SystemSettings;
