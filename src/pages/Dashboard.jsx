import React, { useState } from 'react';
import { Row, Col, Card, Statistic, Typography, Progress, Table, Tag, Space, Button, DatePicker } from 'antd';
import { 
  UserOutlined, 
  ShoppingCartOutlined, 
  DollarOutlined, 
  EyeOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  CalendarOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import './Dashboard.less';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

const Dashboard = () => {
  const [dateRange, setDateRange] = useState('today');

  const statsData = [
    {
      title: '今日活跃用户',
      value: 1247,
      icon: <UserOutlined />,
      color: '#1890ff',
      trend: 12.5,
      trendUp: true,
    },
    {
      title: '今日订单',
      value: 89,
      icon: <ShoppingCartOutlined />,
      color: '#52c41a',
      trend: 8.2,
      trendUp: true,
    },
    {
      title: '今日收入',
      value: 12580,
      icon: <DollarOutlined />,
      color: '#faad14',
      prefix: '¥',
      trend: 15.3,
      trendUp: true,
    },
    {
      title: '今日访客',
      value: 3456,
      icon: <EyeOutlined />,
      color: '#722ed1',
      trend: -5.1,
      trendUp: false,
    },
  ];

  const salesChartData = [
    { time: '00:00', sales: 1200 },
    { time: '04:00', sales: 800 },
    { time: '08:00', sales: 2200 },
    { time: '12:00', sales: 3800 },
    { time: '16:00', sales: 2900 },
    { time: '20:00', sales: 4500 },
    { time: '24:00', sales: 3200 },
  ];

  const categoryData = [
    { name: '电子产品', value: 35, color: '#1890ff' },
    { name: '服装', value: 25, color: '#52c41a' },
    { name: '食品', value: 20, color: '#faad14' },
    { name: '家居', value: 15, color: '#722ed1' },
    { name: '其他', value: 5, color: '#eb2f96' },
  ];

  const recentActivities = [
    {
      key: '1',
      user: '张三',
      action: '完成了订单 #A001',
      time: '2分钟前',
      status: 'success',
    },
    {
      key: '2',
      user: '李四',
      action: '提交了退款申请 #R002',
      time: '5分钟前',
      status: 'warning',
    },
    {
      key: '3',
      user: '王五',
      action: '注册成为新用户',
      time: '10分钟前',
      status: 'info',
    },
    {
      key: '4',
      user: '赵六',
      action: '更新了个人信息',
      time: '15分钟前',
      status: 'default',
    },
  ];

  const activityColumns = [
    {
      title: '用户',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
    },
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const color = {
          success: 'green',
          warning: 'orange',
          info: 'blue',
          default: 'gray',
        }[status];
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <Title level={2}>仪表盘</Title>
        <Space>
          <Button 
            type={dateRange === 'today' ? 'primary' : 'default'} 
            onClick={() => setDateRange('today')}
          >
            今日
          </Button>
          <Button 
            type={dateRange === 'week' ? 'primary' : 'default'} 
            onClick={() => setDateRange('week')}
          >
            本周
          </Button>
          <Button 
            type={dateRange === 'month' ? 'primary' : 'default'} 
            onClick={() => setDateRange('month')}
          >
            本月
          </Button>
          <RangePicker style={{ width: 240 }} />
          <Button icon={<ReloadOutlined />} />
        </Space>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {statsData.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card className="stat-card" hoverable>
              <div className="stat-content">
                <div className="stat-icon" style={{ backgroundColor: stat.color + '20', color: stat.color }}>
                  {stat.icon}
                </div>
                <div className="stat-info">
                  <Text className="stat-title">{stat.title}</Text>
                  <div className="stat-value">
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: stat.color }}>
                      {stat.prefix}{stat.value.toLocaleString()}
                    </Text>
                  </div>
                  <div className="stat-trend">
                    {stat.trendUp ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                    <Text style={{ marginLeft: 4, color: stat.trendUp ? '#52c41a' : '#ff4d4f' }}>
                      {Math.abs(stat.trend)}%
                    </Text>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={16}>
          <Card 
            title="销售趋势" 
            extra={<Text type="secondary">今日实时数据</Text>}
            className="chart-card"
          >
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="time" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#1890ff" 
                  strokeWidth={3}
                  dot={{ fill: '#1890ff', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card 
            title="商品分类占比" 
            className="chart-card"
          >
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="pie-legend">
              {categoryData.map((item) => (
                <div key={item.name} className="legend-item">
                  <span className="legend-color" style={{ backgroundColor: item.color }}></span>
                  <span>{item.name} ({item.value}%)</span>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card 
            title="最近活动" 
            extra={<Button type="link">查看全部</Button>}
            className="activity-card"
          >
            <Table 
              columns={activityColumns} 
              dataSource={recentActivities} 
              pagination={false}
              size="small"
              showHeader={false}
            />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card 
            title="快速操作" 
            className="quick-actions"
          >
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Button type="primary" block size="large">
                  添加商品
                </Button>
              </Col>
              <Col span={12}>
                <Button block size="large">
                  查看订单
                </Button>
              </Col>
              <Col span={12}>
                <Button block size="large">
                  用户管理
                </Button>
              </Col>
              <Col span={12}>
                <Button block size="large">
                  数据导出
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
