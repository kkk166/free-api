import React, { useState } from 'react';
import { Layout, Menu, Avatar, Dropdown, Space, Typography, Button, theme, Modal } from 'antd';
import { 
  DashboardOutlined, 
  SettingOutlined, 
  UserOutlined, 
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LockOutlined
} from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import PasswordChangeModal from '../components/PasswordChangeModal';
import UserProfileModal from '../components/UserProfileModal';
import './DashboardLayout.less';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const DashboardLayout = ({ onLogout }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = theme.useToken();

  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: '仪表板',
    },
    {
      key: '/dashboard/settings',
      icon: <SettingOutlined />,
      label: '系统设置',
    },
  ];

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人资料',
      onClick: () => setProfileModalVisible(true),
    },
    {
      key: 'change-password',
      icon: <LockOutlined />,
      label: '修改密码',
      onClick: () => setPasswordModalVisible(true),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: onLogout,
    },
  ];

  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  return (
    <>
      <Layout className="dashboard-layout">
        <Sider 
          trigger={null} 
          collapsible 
          collapsed={collapsed}
          className="dashboard-sider"
        >
          <div className="logo-container">
            <img 
              src="https://weavefox.alipay.com/api/bolt/unsplash_image?keyword=company+logo&width=200&height=80&random=logo_200_80" 
              alt="Logo" 
              className="logo"
            />
            {!collapsed && <Title level={4} style={{ color: 'white', margin: 0 }}>管理系统</Title>}
          </div>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[location.pathname]}
            items={menuItems}
            onClick={handleMenuClick}
          />
        </Sider>
        
        <Layout>
          <Header className="dashboard-header" style={{ background: token.colorBgContainer }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
            
            <div className="header-right">
              <Space size="large">
                <Dropdown
                  menu={{ items: userMenuItems }}
                  placement="bottomRight"
                  arrow
                >
                  <Space style={{ cursor: 'pointer' }}>
                    <Avatar 
                      src="https://weavefox.alipay.com/api/bolt/unsplash_image?keyword=person+avatar&width=100&height=100&random=avatar_100_100" 
                      size="large" 
                    />
                    <span>管理员</span>
                  </Space>
                </Dropdown>
              </Space>
            </div>
          </Header>
          
          <Content className="dashboard-content">
            <div className="content-wrapper">
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>

      <PasswordChangeModal
        visible={passwordModalVisible}
        onClose={() => setPasswordModalVisible(false)}
      />
      <UserProfileModal
        visible={profileModalVisible}
        onClose={() => setProfileModalVisible(false)}
      />
    </>
  );
};

export default DashboardLayout;
